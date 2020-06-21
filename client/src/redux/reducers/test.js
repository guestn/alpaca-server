import React from 'react';
import reducer, { initialState } from './index.ts';

describe('reducer', () => {
  it('returns unchanged state if no action is specificed', () => {
    const result = reducer(initialState);
    expect(result).toEqual(initialState);
  });
  describe('login actions', () => {
    it('returns balance and currentAddress if login is successful', () => {
      const action = {
        type: 'REQUEST_LOGIN_SUCCEEDED',
        payload: {
          balance: '100',
          currentAddress: 'Nick',
        },
      };
      const result = reducer(initialState, action);
      expect(result).toEqual({ ...initialState, currentAddress: 'Nick', balance: '100' });
    });
    it('returns an error in state if login is unsuccessful', () => {
      const action = {
        type: 'REQUEST_LOGIN_ERRORED',
        error: new Error('failed'),
      };
      const result = reducer(initialState, action);
      expect(result).toEqual({ ...initialState, lastError: new Error('failed') });
    });
  });
  describe('GET transactions actions', () => {
    it('returns transactions in state if GET is successful', () => {
      const transactions = [{ amount: 1, fromAddress: 'Nick', toAddress: 'Bob' }];
      const action = {
        type: 'GET_ALL_TRANSACTIONS_SUCCEEDED',
        transactions,
      };
      const result = reducer(initialState, action);
      expect(result).toEqual({ ...initialState, transactions });
    });
    it('returns an error in state if GET is unsuccessful', () => {
      const action = {
        type: 'GET_ALL_TRANSACTIONS_ERRORED',
        error: new Error('failed'),
      };
      const result = reducer(initialState, action);
      expect(result).toEqual({ ...initialState, lastError: new Error('failed') });
    });
  });
  describe('POST transactions actions', () => {
    it('returns transactions if POST is successful', () => {
      const transactions = [{ amount: 1, fromAddress: 'Nick', toAddress: 'Bob' }];
      const action = {
        type: 'CREATE_TRANSACTION_SUCCEEDED',
        transactions,
      };
      const result = reducer(initialState, action);
      expect(result).toEqual({ ...initialState, transactions });
    });
    it('returns an error in state if login is unsuccessful', () => {
      const action = {
        type: 'GET_ALL_TRANSACTIONS_ERRORED',
        error: new Error('failed'),
      };
      const result = reducer(initialState, action);
      expect(result).toEqual({ ...initialState, lastError: new Error('failed') });
    });
  });
  describe('adjust balance action', () => {
    it('returns a stringified balance adjusted by the action amount', () => {
      const action = {
        type: 'ADJUST_BALANCE',
        amount: -5,
      };
      const stateWithBalance = {
        ...initialState,
        balance: '10',
      };
      const result = reducer(stateWithBalance, action);
      expect(result).toEqual({ ...initialState, balance: '5' });
    });
  });
  describe('create notification', () => {
    it('returns a new notification in first array position in state', () => {
      const action = {
        type: 'CREATE_NOTIFICATION',
        message: 'Im a new one!',
        noteType: 'OK',
        createdAt: new Date(),
      };
      const stateWithNotifications = {
        ...initialState,
        notifications: [{
          message: 'great login!',
          noteType: 'OK',
          createdAt: new Date(),
        }],
      };
      const result = reducer(stateWithNotifications, action);
      const expectedNotifications = [
        {
          message: 'Im a new one!',
          noteType: 'OK',
          createdAt: new Date(),
        },
        ...stateWithNotifications.notifications,
      ];
      expect(result).toEqual({ ...initialState, notifications: expectedNotifications });
    });
  });
});
