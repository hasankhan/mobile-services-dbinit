mobile-services-dbinit
======================

Database initializer for Azure Mobile Service Node Backend that can create tables in your database corresponding to metadata (.json) files in your service/tables folder automatically. This allows you to create tables only by creating json files instead of using azure cli or portal.

### Installation ###
Clone your Mobile Service repository and install the npm module in the 'service' folder

    $ npm install mobileservice-dbinit
    
### Get Started ###

Create a startup.js script in extensions directory with following code:
```js
module.exports.startup = function (context, done) {
    // calling db initializer asynchronously to avoid delaying the startup of app
    require('mobileservice-dbinit')(context);
    done();
}
```
That's it and from now on you can just create .json files in your tables folder and access them from REST API of your Mobile Service.

### Note ###

The tables are created on app startup that means your Mobile Service has to be restarted for the new tables to work. This happens automatically when you commit and push your new json file. Also tables created using this extension are not visible in the portal or CLI.
