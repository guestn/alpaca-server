import { Request, Response, Router, RequestHandler, NextFunction } from 'express';
import { BAD_REQUEST, OK, UNAUTHORIZED } from 'http-status-codes';
import axios, { AxiosResponse } from 'axios';
import { DocumentClient } from 'aws-sdk/lib/dynamodb/document_client';

import { apiRoot, headers } from '../config';
import { checkAuth } from './App';
import AWS from 'aws-sdk';
import { ServiceConfigurationOptions } from 'aws-sdk/lib/service';
import { sendEmail } from '../notifications/email';

let serviceConfigOptions: ServiceConfigurationOptions = {
  region: 'us-west-2',
  endpoint: 'http://localhost:8000',
};

// AWS.config.update({
//   region: 'us-west-2',
//   endpoint: 'http://localhost:9000',
// });

export const docClient: DocumentClient = new AWS.DynamoDB.DocumentClient({
  region: 'us-west-2',
  endpoint: 'http://localhost:8000',
  convertEmptyValues: true,
});

const router = Router();

router.get('/alerts', checkAuth(), async (req: Request, res: Response) => {
  console.log('getAlerts');

  const params = {
    TableName: 'Alerts',
  };

  docClient.scan(params, function (e, data) {
    if (e) {
      console.error('Unable to read item. Error JSON:', JSON.stringify(e, null, 2));
      res.status(500).send({ error: 'something blew up' });
    } else {
      console.log('Scan succeeded:', JSON.stringify(data, null, 2));
      res.send(data);
    }
  });
});

router.post('/alerts', checkAuth(), async (req: Request, res: Response) => {
  const date = new Date();
  const createdAt = date.toISOString();
  const params = {
    TableName: 'Alerts',
    Item: {
      ticker: req.body.ticker,
      low: req.body.low,
      high: req.body.high,
      mid: req.body.mid,
      createdAt,
      id: req.body.id,
    },
  };
  console.log({ params });

  console.log('Adding a new item...');
  docClient.put(params, function (err, data) {
    if (err) {
      console.error('Unable to add item. Error JSON:', JSON.stringify(err, null, 2));
    } else {
      console.log('Added item:', JSON.stringify(data, null, 2));
      sendEmail({
        subject: `Successful alert created for ${params.Item.ticker}: ${params.Item.low} / ${params.Item.high}`,
        text: `Successful alert created for ${params.Item.ticker}: ${params.Item.low} / ${params.Item.high}`,
      });
      res.send(params.Item);
    }
  });
});

router.delete('/alerts/:id', checkAuth(), async (req: Request, res: Response) => {
  const id = req.params.id;
  console.log(req.params);
  var params = {
    TableName: 'Alerts',
    Key: {
      id: req.params.id,
      ticker: 'AAPL',
    },
  };

  console.log('Deleting item...');
  docClient.delete(params, function (err, data) {
    if (err) {
      console.error('Unable to add item. Error JSON:', JSON.stringify(err, null, 2));
    } else {
      console.log('Deleted item:', JSON.stringify(id, null, 2));
      res.send(id);
    }
  });
});

// router.get('/createAlerts', checkAuth(), async (req: Request, res: Response) => {
//   var dynamodb = new AWS.DynamoDB();

//   var params = {
//     TableName: 'Alerts',
//     KeySchema: [
//       { AttributeName: 'createdAt', KeyType: 'HASH' }, //Partition key
//       { AttributeName: 'ticker', KeyType: 'RANGE' }, //Sort key
//     ],
//     AttributeDefinitions: [
//       { AttributeName: 'createdAt', AttributeType: 'N' },
//       { AttributeName: 'ticker', AttributeType: 'S' },
//     ],
//     ProvisionedThroughput: {
//       ReadCapacityUnits: 10,
//       WriteCapacityUnits: 10,
//     },
//   };

//   dynamodb.createTable(params, function (err, data) {
//     if (err) {
//       console.error('Unable to create table. Error JSON:', JSON.stringify(err, null, 2));
//     } else {
//       console.log('Created table. Table description JSON:', JSON.stringify(data, null, 2));
//     }
//   });
// });

/******************************************************************************
 *                                 Export Router
 ******************************************************************************/

export default router;
