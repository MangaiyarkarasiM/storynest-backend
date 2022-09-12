var AWS = require('aws-sdk');

AWS.config.update({
    region: "local",
    endpoint: "http://localhost:8000"
  });

var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

var docClient = new AWS.DynamoDB.DocumentClient();

var params = {
  AttributeDefinitions: [
    {
      AttributeName: 'PartStory',
      AttributeType: 'S'
    }
  ],
  KeySchema: [
    {
      AttributeName: 'PartStory',
      KeyType: 'HASH'
    }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1
  },
  TableName: 'PartStats',
  StreamSpecification: {
    StreamEnabled: false
  }
};

// ddb.createTable(params, function(err, data) {
//   if (err) {
//     console.log("Error", err);
//   } else {
//     console.log("Table Created", data);
//   }
// });

module.exports = {ddb,docClient};


