var path = require('path'),
    fs = require('fs');

var SQL_CREATE_TABLE = "IF NOT EXISTS (" +
        

                                "SELECT 1 FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = '%1$s' AND TABLE_NAME = '%2$s'" +

                        ") CREATE TABLE [%1$s].[%2$s] (%3$s)";

module.exports.startup = function (context, done) {
	var tablesPath = path.resolve(__dirname, '../table')
	var files = fs.readdirSync(tablesPath);	
        var schemaName = process.env.MS_MobileServiceName.replace(/-/g, '_');

	files.forEach(function(file){
	  if (path.extname(file) !== '.json') return;

	  var tableName = file.substring(0, file.indexOf('.'));
	  var columnDefs = ['[id] NVARCHAR(255) PRIMARY KEY NONCLUSTERED DEFAULT CONVERT(nvarchar(255), NEWID())'];

          var query =  SQL_CREATE_TABLE.replace(/%1\$s/g, schemaName)
                                       .replace(/%2\$s/g, tableName)
                                       .replace(/%3\$s/g, columnDefs.join(','));

	  context.mssql.query(query);
	});
	done();
}