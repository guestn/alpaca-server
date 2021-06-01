import axios from 'axios';
import { Dispatch } from 'redux';

export const GET_ALERTS_ERRORED = 'GET_ALERTS_ERRORED';
export const GET_ALERTS_SUCCEEDED = 'GET_ALERTS_SUCCEEDED';

interface GetAlertsErroredAction {
    type: typeof GET_ALERTS_ERRORED;
    error: Error;
}

interface GetAlertsSucceededAction {
    type: typeof GET_ALERTS_SUCCEEDED;
    alerts: {};
}

export const getAlertsErrored = (error: Error): GetAlertsErroredAction => ({
    type: GET_ALERTS_ERRORED,
    error,
});

export const getAlertsSucceeded = (alerts: []): GetAlertsSucceededAction => ({
    type: GET_ALERTS_SUCCEEDED,
    alerts,
});

export const getAlerts = () => (dispatch: Dispatch<any>) => {
    axios
        .get('api/alerts/alerts')
        .then((response) => {
            if (response.status === 200) {
                console.log({ response });
                return dispatch(getAlertsSucceeded(response.data.Items));
            }
            return null;
        })
        .catch((e) => {
            dispatch(getAlertsErrored(e));
        });
};
