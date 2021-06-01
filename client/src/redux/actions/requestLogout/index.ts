import axios from 'axios';
import { Dispatch } from 'redux';
import { createNotification, NoteType } from '../createNotification';
import { History } from 'history';

export const REQUEST_LOGOUT_ERRORED = 'REQUEST_LOGOUT_ERRORED';
export const REQUEST_LOGOUT_SUCCEEDED = 'REQUEST_LOGOUT_SUCCEEDED';

interface RequestLogoutErroredAction {
    type: typeof REQUEST_LOGOUT_ERRORED;
    error: Error;
}

interface RequestLogoutSucceededAction {
    type: typeof REQUEST_LOGOUT_SUCCEEDED;
}

interface RequestLogoutParams {
    history: History;
}

export const requestLogoutErrored = (error: Error): RequestLogoutErroredAction => ({
    type: REQUEST_LOGOUT_ERRORED,
    error,
});

export const requestLogoutSucceeded = (): RequestLogoutSucceededAction => ({
    type: REQUEST_LOGOUT_SUCCEEDED,
});

export const requestLogout = ({ history }: { history : History }) => (dispatch: Dispatch<any>) => {
    console.log({ requestLogout: history });

    axios
        .get('api/auth/logout')
        .then(() => {
            document.cookie = 'name=; expires=Thu, 01 Jan 1970 00:00:00 GMT'; //expire the client cookie
            history.push('/login');
            dispatch(requestLogoutSucceeded());
            return dispatch(createNotification({ noteType: NoteType.OK, message: 'Logout Succesful' }));
        })
        .catch((e: Error) => {
            dispatch(requestLogoutErrored(e));
            return dispatch(createNotification({ noteType: NoteType.ERROR, message: e.message }));
        });
};
