var ActiveDirectory = require('activedirectory');
var logger          = require('winston');
var settings        = require('../../config/settings');

module.exports = function() {
    var controller = {};

    var url = settings.ldapUrl;
    var baseDN = settings.baseDN;
    var domainName = settings.domainName;

    logger.log('info', 'Starting AD Helper');
    logger.log('info', 'url: %s', url);
    logger.log('info', 'baseDN: %s', baseDN);
    logger.log('info', 'domainName: %s', domainName);

    controller.auth = function(userName, password, cb) {

        var ad = new ActiveDirectory({ url: url,
               baseDN: baseDN });
        var un = userName.toLowerCase();

        var dn = domainName.replace('\\','').toLowerCase() + '\\';
        
        if(!un.startsWith(dn)) {
            un = dn + userName;
        }

        logger.log('info', 'Trying to authenticate user "%s"',un);
        logger.log('debug', 'userName: %', userName)
        logger.log('debug', 'userName parsed: %s', un);

        ad.authenticate(un, password, function(err, auth) {
            if(err) {
                logger.log('info', 'The credentials are invalid for the user "%s"', un);
            } else {
                logger.log('info', 'User has "%s" been authenticated successfully', un);
            }

            cb(err, auth);
        });
    };

    logger.log('info', 'AD Helper has been started successfully');

    return controller;
}