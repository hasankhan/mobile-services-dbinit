var path = require('path'),
    fs = require('fs'),
    TableBuilder = require('./tablebuilder');

exports = module.exports = function (context, done) {
    var tablesPath = context.tablesPath || path.resolve(__dirname, '../table')
    var schemaName = context.schemaName || (context.serviceName || process.env.MS_MobileServiceName).replace(/-/g, '_');
    var idType = context.idType || 'string';

    var builder = new TableBuilder(schemaName);

    var files = fs.readdirSync(tablesPath);
    files.forEach(function (file) {
        if (path.extname(file) !== '.json') return;

        var tableName = file.substring(0, file.indexOf('.'));
        var query = builder.getSql(tableName, idType);

        context.mssql.query(query, {
            error: function (err) {
                console.log('Error creating the table for ', tableName, ' due to error: ' + err.toString());
            }
        });
    });

    if (typeof done === 'function') {
        done();
    }
};