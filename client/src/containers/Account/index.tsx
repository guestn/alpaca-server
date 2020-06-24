import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux'

import AccountBox from '../../components/MainPage/AccountBox';
import actions from '../../redux/actions';
import { RootState } from '../../redux/reducers/types';

interface DispatchProps {
  getAccountData: () => {}
}

export interface AccountData {
  buying_power: string,
  cash: string,
  portfolio_value: string,
}
interface AccountProps  {
  accountData: AccountData,
  getAccountData: () => {},
}

const Account = ({
  accountData,
  getAccountData,
}: AccountProps) => (
  <AccountBox
    accountData={accountData}
    onRequestAccountData={getAccountData}
  />
);

const mapStateToProps = (state: RootState) => ({
  accountData: state.accountData || null,
});

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchProps => ({
  getAccountData: () => dispatch(actions.getAccountData()),
});

export default connect<RootState, DispatchProps>(mapStateToProps, mapDispatchToProps)(Account);
