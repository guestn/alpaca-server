import axios, { AxiosResponse } from 'axios';
import { Dispatch } from 'redux';
import { createNotification, NoteType } from '../createNotification';

export const GET_ACCOUNT_DATA_ERRORED = 'GET_ACCOUNT_DATA_ERRORED';
export const GET_ACCOUNT_DATA_SUCCEEDED = 'GET_ACCOUNT_DATA_SUCCEEDED';

interface GetAccountDataErroredAction {
    type: typeof GET_ACCOUNT_DATA_ERRORED;
    error: Error;
}
interface GetAccountDataSucceededAction {
    type: typeof GET_ACCOUNT_DATA_SUCCEEDED;
    accountData: {};
}

export const getAccountDataErrored = (error: Error): GetAccountDataErroredAction => ({
    type: GET_ACCOUNT_DATA_ERRORED,
    error,
});

export const getAccountDataSucceeded = (accountData: {}): GetAccountDataSucceededAction => ({
    type: GET_ACCOUNT_DATA_SUCCEEDED,
    accountData,
});

export const getAccountData = () => (dispatch: Dispatch<any>) => {
    axios
        .get('api/account')
        //axios.get('https://paper-api.alpaca.markets/v2/account', { headers })
        .then((response: AxiosResponse) => {
            dispatch(getAccountDataSucceeded(response.data));
            return dispatch(createNotification({ noteType: NoteType.OK, message: 'Account Data loaded successfully' }));
        })
        .catch((e: Error) => {
            dispatch(getAccountDataErrored(e));
            return dispatch(createNotification({ noteType: NoteType.ERROR, message: 'Could not load account data' }));
        });
};
