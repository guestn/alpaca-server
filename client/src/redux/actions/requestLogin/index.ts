import axios from 'axios';
import { createNotification, NoteType } from '../createNotification';
import { Dispatch } from 'redux';

import { historyPush } from '../../../router';

export const REQUEST_LOGIN_ERRORED = 'REQUEST_LOGIN_ERRORED';
export const REQUEST_LOGIN_SUCCEEDED = 'REQUEST_LOGIN_SUCCEEDED';

interface RequestLoginErroredAction {
  type: typeof REQUEST_LOGIN_ERRORED,
  error: Error,
};

interface RequestLoginSucceededAction {
  type: typeof REQUEST_LOGIN_SUCCEEDED,
  user: {},
};

interface Params {
  firebase: object,
  user: string,
  password: string,
}

export const requestLoginErrored = (error: Error):RequestLoginErroredAction => ({
  type: REQUEST_LOGIN_ERRORED,
  error,
});

export const requestLoginSucceeded = (user: {}):RequestLoginSucceededAction => ({
  type: REQUEST_LOGIN_SUCCEEDED,
  user,
});

export const requestLogin = (params: Params) => (dispatch: Dispatch<any>) => {
  // const user = getPersistedUser();

  // console.log({user})
  // if (user) {
  //   historyPush('/');
  //   dispatch(requestLoginSucceeded(user));
  //   return dispatch(createNotification({ noteType: NoteType.OK, message: 'Login Succesful' }));
  // }


  ///if (!params.user || !params.password || !params.password) return false;
  console.log({params})
  const data = {
    email: params.user,
    password: params.password
  }


  if (!document.cookie.split(';').some((item) => item.trim().startsWith('name=Alpaca-Client'))) {
    console.log('The cookie does not exists (ES6)')
    if (!params.user || !params.password) return
  }
  console.log('login action')
  axios.post('/api/auth/login', data)
    .then((response) => {
      if (response.status === 200) {
        document.cookie = "name=Alpaca-Client";
        console.log('login response', {response})        
        historyPush('/');
        dispatch(requestLoginSucceeded(response.data.user));
      }
      return null;
    })
    .catch((e) => {
      console.log({e})

      dispatch(requestLoginErrored(e));
      return dispatch(createNotification({ noteType: NoteType.ERROR, message: e.response.data.error }));
    });
  return false;
};
