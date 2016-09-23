var privateSettings     = require('./private-settings');

module.exports = {
    mongoUrl        : 'mongodb://localhost/esnp-services',
    servicePort     : 5000,  
    jwtKey          : privateSettings.jwtKey,
    gcmKey          : privateSettings.gcmKey,
    domainName      : privateSettings.domainName,
    ldapUrl         : privateSettings.ldapUrl,
    ldapBaseDN      : privateSettings.ldapBaseDN,
    validUserName   : privateSettings.validUserName,
    validUserData   : privateSettings.validUserData,
    invalidUserData : privateSettings.invalidUserData
}