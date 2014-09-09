module.exports.startup = function (context, done) {
    // calling db initializer asynchronously to avoid delaying the startup of app
    require('./dbinit')(context);
    done();
}