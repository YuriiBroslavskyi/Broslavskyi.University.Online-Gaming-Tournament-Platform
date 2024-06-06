const config = require('config');

module.exports = {
    clientID: config.get('CLIENT_ID'),
    clientSecret: config.get('CLIENT_SECRET'),
    sessionSecret: config.get('SESSION_SECRET'),
    port: config.get('PORT'),
    connectionString: config.get('CONNECTION_STRING'),
    projectId: config.get('PROJECT_ID'),
    bucketName: config.get('BUCKET_NAME'),
};
