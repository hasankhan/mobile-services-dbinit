var SQL_CREATE_TABLE = "IF NOT EXISTS (" +
                            "SELECT 1 FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = '%1$s' AND TABLE_NAME = '%2$s'" +
                       ") CREATE TABLE [%1$s].[%2$s] (%3$s)",
    SQL_DEF_ID_STRING = "[id] NVARCHAR(255) PRIMARY KEY NONCLUSTERED DEFAULT CONVERT(nvarchar(255), NEWID())",
    SQL_DEF_ID_INT = "[id] [int] IDENTITY(1,1) NOT NULL";

var TableBuilder = (function () {
    function TableBuilder(connection, schemaName) {
        this.connection = connection;
        this.schemaName = schemaName;
    }

    TableBuilder.prototype.ensureTable = function (tableName, idType, done) {
        var query = this._getSql(tableName, idType);

        this.connection.query(query, {
            success: function () {
                done();
            },
            error: function (err) {
                done(err);
            }
        });
    };

    TableBuilder.prototype._getSql = function (tableName, idType) {
        var columnDefs = [];

        columnDefs.push(this._getIdDefinition(idType));

        var query = SQL_CREATE_TABLE.replace(/%1\$s/g, this.schemaName)
                                     .replace(/%2\$s/g, tableName)
                                     .replace(/%3\$s/g, columnDefs.join(','));

        return query;
    };

    TableBuilder.prototype._getIdDefinition = function (type) {
        if (type == 'number') {
            return SQL_DEF_ID_INT;
        }
        return SQL_DEF_ID_STRING;
    };

    return TableBuilder
})();

exports = module.exports = TableBuilder;