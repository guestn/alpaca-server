import AWS from 'aws-sdk';

AWS.config.update({
  region: 'us-west-2',
});

var dynamodb = new AWS.DynamoDB();

var params = {
  TableName: 'Alerts',
  KeySchema: [
    { AttributeName: 'createdAt', KeyType: 'HASH' }, //Partition key
    { AttributeName: 'ticker', KeyType: 'RANGE' }, //Sort key
  ],
  AttributeDefinitions: [
    { AttributeName: 'createdAt', AttributeType: 'N' },
    { AttributeName: 'ticker', AttributeType: 'S' },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10,
  },
};

dynamodb.createTable(params, function (err, data) {
  if (err) {
    console.error('Unable to create table. Error JSON:', JSON.stringify(err, null, 2));
  } else {
    console.log('Created table. Table description JSON:', JSON.stringify(data, null, 2));
  }
});
