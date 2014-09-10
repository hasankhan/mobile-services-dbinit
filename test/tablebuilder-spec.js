var proxyquire =  require('proxyquire').noPreserveCache();

describe('TableBuilder', function() {
    var builder, connection, schema;

    function setup() {
        connection = {
            query: jasmine.createSpy()
        };
        schema = 'test';

        var TableBuilder = proxyquire('../lib/tablebuilder', {            
        });
        builder = new TableBuilder(connection, schema);                           
    }

    describe('ensureTable', function() {
        beforeEach(function() {            
           setup(); 
        });

        it('runs the query', function() {
            builder.ensureTable('test', 'string', function(){});
			expect(connection.query).toHaveBeenCalled();
        });               
    });
});