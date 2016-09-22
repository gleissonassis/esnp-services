module.exports = function(cb, done) {
    try{
        cb();
        done();
    } catch(e) {
        done(e);
    }
}