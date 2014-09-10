var path = require('path'),
    fs = require('fs'),
    TableBuilder = require('./tablebuilder');

var tableNamePattern = /^[_a-z][a-z0-9_]{0,59}$/i;

exports = module.exports = function (options, done) {
    var tablesPath = options.tablesPath || path.resolve(__dirname, '../../../table')
    var schemaName = options.schemaName || (options.serviceName || process.env.MS_MobileServiceName).replace(/-/g, '_');
    var idType = options.idType || 'string';

    var builder = new TableBuilder(options.mssql, schemaName);

    var files = fs.readdirSync(tablesPath);
    files.forEach(function (file) {
        if (path.extname(file) !== '.json') return;

        var tableName = file.substring(0, file.indexOf('.'));
        // validate its a valid table name
        if (tableNamePattern.test(tableName)) {
            builder.ensureTable(tableName, idType, function (err) {
                if (err) {
                    console.log('Error creating the table for ', tableName, ' due to error: ', err.toString());
                }
            });
        }
    });

    if (typeof done === 'function') {
        done();
    }
};