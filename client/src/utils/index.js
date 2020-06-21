import React, { useEffect, useRef } from 'react';

export const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    const tick = () => {
      savedCallback.current();
    };
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

export const getPersistedUser = () => {
  const userKey = Object.keys(window.sessionStorage)
    .filter((it) => it.startsWith('firebase:authUser'))[0];
  const user = userKey ? JSON.parse(sessionStorage.getItem(userKey)) : undefined;
  return user;
};

export const isLoggedIn = (firebase) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in.
      return true;
    }
    // No user is signed in.
    return false;
  });
};

export const str2ab = (str) => {
  const buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
  const bufView = new Uint16Array(buf);
  for (let i=0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
};

export const ab2str = (buf) => String.fromCharCode.apply(null, new Uint8Array(buf));
