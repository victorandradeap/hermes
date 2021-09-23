const argv = require('./args');
var AWS = require('aws-sdk');

// Configure Region
AWS.config.update({ region: 'us-east-1' });

// Configure Credentials
var credentials = new AWS.SharedIniFileCredentials({ profile: argv.profile });
AWS.config.credentials = credentials;

module.exports = AWS;