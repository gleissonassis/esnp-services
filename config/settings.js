var privateSettings     = require('./private-settings');

module.exports = {
    mongoUrl    : 'mongodb://localhost/esnp-services',
    servicePort : 5000,  
    gcmKey      : privateSettings.gcmKey  
}