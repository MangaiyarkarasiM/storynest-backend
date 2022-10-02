var AWS = require('aws-sdk');

AWS.config.update({
    region: process.env.TABLE_REGION,
    endpoint: process.env.ENDPOINT,
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY
  });

var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

var docClient = new AWS.DynamoDB.DocumentClient();

module.exports = {ddb,docClient};
