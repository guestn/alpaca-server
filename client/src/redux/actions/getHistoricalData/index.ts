import axios from 'axios';
import { Dispatch } from 'redux';
import { HistoricalData } from '../../reducers/types';
import { createNotification, NoteType } from '../createNotification';

export const GET_HISTORICAL_DATA_ERRORED = 'GET_HISTORICAL_DATA_ERRORED';
export const GET_HISTORICAL_DATA_SUCCEEDED = 'GET_HISTORICAL_DATA_SUCCEEDED';

interface GetHistoricalDataErroredAction {
    type: typeof GET_HISTORICAL_DATA_ERRORED;
    error: Error;
}

interface GetHistoricalDataSucceededAction {
    type: typeof GET_HISTORICAL_DATA_SUCCEEDED;
    historicalData: {};
}

export interface GetHistoricalDataParams {
    timeframe: string;
    limit: number;
    symbols: string;
}

export const getHistoricalDataErrored = (error: Error): GetHistoricalDataErroredAction => ({
    type: GET_HISTORICAL_DATA_ERRORED,
    error,
});

export const getHistoricalDataSucceeded = (historicalData: HistoricalData): GetHistoricalDataSucceededAction => ({
    type: GET_HISTORICAL_DATA_SUCCEEDED,
    historicalData,
});

export const getHistoricalData =
    ({ timeframe = '1D', limit = 5, symbols }: GetHistoricalDataParams) =>
    (dispatch: Dispatch<any>) => {
        const before = '2020-04-15T09:30:00-04:00';
        const params = {
            timeframe,
            before: new Date(),
            limit,
            symbols,
        };

        axios
            .get(`/api/historicaldata`, { params })
            .then((response) => {
                dispatch(getHistoricalDataSucceeded(response.data));
                return dispatch(createNotification({ noteType: NoteType.OK, message: 'Data loaded successfully' }));
            })
            .catch((e) => {
                dispatch(getHistoricalDataErrored(e));
                return dispatch(createNotification({ noteType: NoteType.ERROR, message: 'Could not load data' }));
            });
    };
