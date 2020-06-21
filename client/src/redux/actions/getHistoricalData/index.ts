import axios from 'axios';
import { Dispatch } from 'redux';
import { headers } from '../../../config.ts';
import { createNotification } from '../createNotification/index.ts';

export const GET_HISTORICAL_DATA_ERRORED = 'GET_HISTORICAL_DATA_ERRORED';
export const GET_HISTORICAL_DATA_SUCCEEDED = 'GET_HISTORICAL_DATA_SUCCEEDED';

interface GetHistoricalDataErroredAction {
  type: typeof GET_HISTORICAL_DATA_ERRORED,
  error: Error,
}

interface GetHistoricalDataSucceededAction {
  type: typeof GET_HISTORICAL_DATA_SUCCEEDED,
  data: {}
}

interface Params {
  timeframe: string,
  limit: number,
  symbols: string,
}

export const getHistoricalDataErrored = (error: Error):GetHistoricalDataErroredAction => ({
  type: GET_HISTORICAL_DATA_ERRORED,
  error,
});

export const getHistoricalDataSucceeded = (data: {}):GetHistoricalDataSucceededAction => ({
  type: GET_HISTORICAL_DATA_SUCCEEDED,
  data,
});

export const getHistoricalData = ({ timeframe = '1D', limit = 5, symbols }: Params) => (dispatch: Dispatch<any>) => {
  
  const before = '2020-04-15T09:30:00-04:00';
  const params = {
    //timeframe,
    before: new Date(),
    limit,
    symbols,
  };

  // curl -H "APCA-API-KEY-ID: PK4XHGBPNJJ9XBNM6F3U"  -H "APCA-API-SECRET-KEY: GuqbPEudiBgjk4AohuXd9PPnA8GcpKkArXqHF7ci"  "https://data.alpaca.markets/v1/bars/1D?symbols=AAPL&limit=100"

  axios.get(`https://cors-anywhere.herokuapp.com/https://data.alpaca.markets/v1/bars/${timeframe}`, { headers, params })
    .then((response) => {
      dispatch(getHistoricalDataSucceeded(response.data));
      return dispatch(createNotification({ noteType: 'OK', message: 'Data loaded successfully' }));
    })
    .catch((e) => {
      dispatch(getHistoricalDataErrored(e));
      return dispatch(createNotification({ noteType: 'ERROR', message: 'Could not load data' }));
    });
};
