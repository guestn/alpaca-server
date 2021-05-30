import { Request, Response, Router, RequestHandler, NextFunction } from 'express';
import { BAD_REQUEST, OK, UNAUTHORIZED } from 'http-status-codes';
import { DocumentClient } from 'aws-sdk/lib/dynamodb/document_client';

import { apiRoot, headers } from '../config';
import { checkAuth } from './App';
import AWS from 'aws-sdk';
import { ServiceConfigurationOptions } from 'aws-sdk/lib/service';
import { sendEmail } from '../notifications/email';

export const docClient: DocumentClient = new AWS.DynamoDB.DocumentClient({
    region: 'us-west-2',
    //endpoint: 'http://localhost:8000',
    convertEmptyValues: true,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const router = Router();

const TABLE_NAME = 'Alpaca-Alerts';

export const getAlerts = async (): Promise<{ response: any | null, error: Error | null}> => {
    const params = {
        TableName: TABLE_NAME,
    };

    try {
        const data = await docClient.scan(params).promise();
        console.log('Scan succeeded getAlerts:', JSON.stringify(data, null, 2));
        return { error: null, response: data };
    } catch (e) {
        console.error('Unable to read item. Error JSON:', JSON.stringify(e, null, 2));
        return { error: e, response: null };
    }
};

router.get('/alerts', checkAuth(), async (req: Request, res: Response) => {
    console.log('getAlerts');
    const { response, error } = await getAlerts();

    if (error) {
        console.error('Unable to read item. Error JSON:', JSON.stringify(error, null, 2));
        res.status(500).send({ error: 'something blew up' });
    } else {
        console.log('Scan succeeded:', JSON.stringify(response, null, 2));
        res.send(response);
    }
});

router.post('/alerts', checkAuth(), async (req: Request, res: Response) => {
    const date = new Date();
    const createdAt = date.toISOString();
    const params = {
        TableName: TABLE_NAME,
        Item: {
            ticker: req.body.ticker,
            low: req.body.low,
            high: req.body.high,
            mid: req.body.mid,
            createdAt,
            id: req.body.id,
        },
    };

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
    // must use both partition key AND sort key
    var params = {
        TableName: TABLE_NAME,
        Key: {
            id: req.params.id,
            ticker: 'AAPL',
        },
    };

    console.log('Deleting item...', req.params.id);
    docClient.delete(params, function (err, data) {
        if (err) {
            console.error('Unable to add item. Error JSON:', JSON.stringify(err, null, 2));
        } else {
            console.log('Deleted item:', JSON.stringify(id, null, 2));
            res.send(id);
        }
    });
});

/******************************************************************************
 *                                 Export Router
 ******************************************************************************/

export default router;
