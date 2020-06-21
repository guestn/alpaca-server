import axios from 'axios';
import { createNotification } from '../createNotification/index.ts';
import { Dispatch } from 'redux';
import 'firebase/auth';
import * as firebase from 'firebase/app';
//import { FirebaseAuth } from '@firebase/auth-types';

//import * as firebase from 'firebase/app';
import { historyPush } from '../../../router/index.ts';
import { getPersistedUser } from '../../../utils';
import { cachedDataVersionTag } from 'v8';

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
  const user = getPersistedUser();

  console.log({user})
  if (user) {
    historyPush('/');
    dispatch(requestLoginSucceeded(user));
    return dispatch(createNotification({ noteType: 'OK', message: 'Login Succesful' }));
  }


  ///if (!params.user || !params.password || !params.password) return false;
  //firebase.auth.Auth.Persistence.SESSION
  console.log({params})
  const data = {
    email: params.user,
    password: params.password
  }
  console.log('login action')
  axios.post('/api/auth/login', data)
    .then((response) => {
      if (response.status === 200) {
        console.log('login response', {response})
       // console.log({ jwt });
        
        historyPush('/');
        dispatch(requestLoginSucceeded(response.data.user));
        // return dispatch(createNotification({ noteType: 'OK', message: 'Order created successfully' }));
      }
      return null;
    })
    .catch((e) => {
      console.log({e})

      // dispatch(createOrderErrored(e));
      // return dispatch(createNotification({ noteType: 'ERROR', message: e.response.data.error }));
    });

  // firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
  //   .then(() => {
  //     firebase.auth().signInWithEmailAndPassword(params.user, params.password)
  //       .then((response) => {
  //         historyPush('/');
  //         dispatch(requestLoginSucceeded(response.user));
  //         return dispatch(createNotification({ noteType: 'OK', message: 'Login Succesful' }));
  //       })
  //       .catch((e: Error) => {
  //         dispatch(requestLoginErrored(e));
  //         return dispatch(createNotification({ noteType: 'ERROR', message: e.message }));
  //       });
  //   })
  //   .catch((e: Error) => {
  //     console.error('persistence login error', e);
  //   });

  return false;
};
