import { docClient } from '../routes/Alerts';
import { AttributeMap, AttributeValue } from 'aws-sdk/clients/dynamodb';
import { DocumentClient as DocClient } from 'aws-sdk/lib/dynamodb/document_client';
import { sendEmail } from './email';

interface CheckAlertsArgs {
  ticker: string;
  data: { P: number };
}

interface Alert extends AttributeMap {
  high: AttributeValue; //string | number,
  low: AttributeValue; //string | number
}

interface Data {
  Items: Alert[];
}

export const checkAlerts = async ({ ticker, data }: CheckAlertsArgs) => {
  const alert: any = await getAlert(ticker);
  console.log({ alert, dP: data.P });
  if (!alert) return;

  const { id } = alert;
  let message;
  if (alert.high < data.P && !alert.highSent) {
    console.log('it is TOO high');
    const highSent = new Date().toISOString();
    updateAlert({ alert, highSent });
    message = `${ticker} went ABOVE ${alert.high} and is now ${data.P}`;
  }
  if (alert.low > data.P && !alert.lowSent) {
    console.log('it is TOO low');
    const lowSent = new Date().toISOString();
    updateAlert({ alert, lowSent });
    message = `${ticker} went BELOW ${alert.high} and is now ${data.P}`;
  }
  console.log({ message });

  if (message) {
    sendEmail({ subject: message, text: message });
  }
};

interface UpdateArgs {
  alert: Alert;
  highSent?: string;
  lowSent?: string;
}

export const updateAlert = ({ alert, highSent, lowSent }: UpdateArgs) => {
  const params = {
    TableName: 'Alpaca-Alerts',
    Item: {
      ...alert,
      highSent: highSent || alert.highSent,
      lowSent: lowSent || alert.lowSent,
    },
  };
  docClient.put(params, (err, data) => {
    if (err) {
      console.error('Unable to update item. Error JSON:', JSON.stringify(err, null, 2));
    } else {
      console.log('Updated item:', JSON.stringify(data, null, 2));
    }
  });
};

export const getAlert = async (ticker: string) => {
  const params = {
    TableName: 'Alpaca-Alerts',
    // Key: {
    //   ticker,
    //   //"title": title
    // },
  };
  try {
    const data: any = await docClient.scan(params).promise();

    console.log('Scan succeeded:', JSON.stringify(data, null, 2));
    const parsedData = data;
    console.log({ ticker });

    const alert = parsedData && parsedData.Items && parsedData.Items.find((item: any) => item.ticker === ticker);
    console.log({ xxx: alert });
    if (!alert) return console.error('Unable to read item. Error JSON');
    return alert;
  } catch (e) {
    console.error('Unable to read item. Error JSON:', JSON.stringify(e, null, 2));
  }
};
