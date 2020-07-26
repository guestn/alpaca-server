const AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-west-2',
  endpoint: 'http://localhost:8000',
});

var dynamodb = new AWS.DynamoDB();

var params2 = {
  TableName: 'Alerts',
  KeySchema: [
    { AttributeName: 'id', KeyType: 'HASH' }, //Partition key
    { AttributeName: 'ticker', KeyType: 'RANGE' }, //Sort key
  ],
  AttributeDefinitions: [
    { AttributeName: 'id', AttributeType: 'S' },
    { AttributeName: 'ticker', AttributeType: 'S' },
    // { AttributeName: 'low', AttributeType: 'N' },
    // { AttributeName: 'high', AttributeType: 'N' },
    // { AttributeName: 'createdAt', AttributeType: 'D' },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10,
  },
};

dynamodb.createTable(params2, function (err, data) {
  if (err) {
    console.error('Unable to create table. Error JSON:', JSON.stringify(err, null, 2));
  } else {
    console.log('Created table. Table description JSON:', JSON.stringify(data, null, 2));
  }
});
