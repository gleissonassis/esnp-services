var privateSettings     = require('./private-settings');
var util                = require('util');

module.exports = {
    mongoUrl        : util.format('mongodb://%s/esnp-services', process.env.ESNPDB_PORT || 'localhost'),
    servicePort     : process.env.PORT || 5000,  
    isMongoDebug    : true,
    jwtKey          : privateSettings.jwtKey,
    gcmKey          : privateSettings.gcmKey,
    domainName      : privateSettings.domainName,
    ldapUrl         : privateSettings.ldapUrl,
    ldapBaseDN      : privateSettings.ldapBaseDN,
    validUserName   : privateSettings.validUserName,
    validUserData   : privateSettings.validUserData,
    invalidUserData : privateSettings.invalidUserData
};