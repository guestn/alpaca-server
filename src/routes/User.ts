import { docClient } from './Alerts';
import { PutItemOutput } from 'aws-sdk/clients/dynamodb';
import { AWSError } from 'aws-sdk';

const TABLE_NAME = 'Alpaca-Users';

export const getUserByEmail = async (email: string): Promise<{ user: any | null; error: Error | null }> => {
    const params = {
        TableName: TABLE_NAME,
        FilterExpression: 'email = :e',
        ExpressionAttributeValues: {
            ':e': email,
        },
    };

    try {
        const data = await docClient.scan(params).promise();
        console.log('Scan succeeded getUserByEmail');
        return { error: null, user: data && data.Items && data.Items[0] };
    } catch (e) {
        console.error('Unable to read item. Error JSON:', JSON.stringify(e, null, 2));
        return { error: e, user: null };
    }
};

export const getUserById = async (id: string): Promise<{ user: any | null; error: Error | null }> => {
  const params = {
      TableName: TABLE_NAME,
      FilterExpression: 'id = :i',
      ExpressionAttributeValues: {
          ':i': id,
      },
  };

  try {
      const data = await docClient.scan(params).promise();
      console.log('Scan succeeded getUserById');
      return { error: null, user: data && data.Items && data.Items[0] };
  } catch (e) {
      console.error('Unable to read item. Error JSON:', JSON.stringify(e, null, 2));
      return { error: e, user: null };
  }
};

export const addUser = async (): Promise<PutItemOutput | AWSError> => {
    const params = {
        TableName: TABLE_NAME,
        Item: {
            name: '',
            email: '',
            pwdHash: '',
            role: 1,
            id: '',
        },
    };

    console.log('Adding a new user...');
    try {
        const data = await docClient.put(params).promise();
        console.log('Added item:', JSON.stringify(data, null, 2));
        return data || {};
    } catch (e) {
        console.error('Unable to add item. Error JSON:', JSON.stringify(e, null, 2));
        return e;
    }
};
