import axios from 'axios';
import { createNotification, NoteType } from '../createNotification';
import { Dispatch } from 'redux';
import { History } from 'history';

export const REQUEST_LOGIN_ERRORED = 'REQUEST_LOGIN_ERRORED';
export const REQUEST_LOGIN_SUCCEEDED = 'REQUEST_LOGIN_SUCCEEDED';

interface RequestLoginErroredAction {
    type: typeof REQUEST_LOGIN_ERRORED;
    error: Error;
}

interface RequestLoginSucceededAction {
    type: typeof REQUEST_LOGIN_SUCCEEDED;
    user: {};
}

interface Params {
    user: string;
    password: string;
}

export const requestLoginErrored = (error: Error): RequestLoginErroredAction => ({
    type: REQUEST_LOGIN_ERRORED,
    error,
});

export const requestLoginSucceeded = (user: {}): RequestLoginSucceededAction => ({
    type: REQUEST_LOGIN_SUCCEEDED,
    user,
});

export const requestLogin = (params: Params, history: History) => (dispatch: Dispatch<any>) => {
    //const user = getPersistedUser();
    console.log({ xx: history });
    
    // console.log({user})
    // if (user) {
    //   historyPush('/');
    //   dispatch(requestLoginSucceeded(user));
    //   return dispatch(createNotification({ noteType: NoteType.OK, message: 'Login Succesful' }));
    // }

    ///if (!params.user || !params.password || !params.password) return false;
    console.log({ params });
    const data = {
        email: params.user,
        password: params.password,
    };

    console.log('login action');
    axios
        .post('/api/auth/login', data)
        .then((response) => {
            if (response.status === 200) {
                console.log('login response', { response });
                dispatch(requestLoginSucceeded(response.data));
                history.push('/');
            }
            return null;
        })
        .catch((e) => {
            console.log({ e });
            dispatch(requestLoginErrored(e));
            return dispatch(createNotification({ noteType: NoteType.ERROR, message: e.response.data.error }));
        });
    return false;
};
