import React from 'react';
// import { func, object } from 'prop-types';
import { connect } from 'react-redux';
import { Dispatch } from 'redux'
// import * as React from 'react'
import AccountBox from '../../components/MainPage/AccountBox/index.tsx';
import actions from '../../redux/actions/index.ts';
import { RootState } from '../../redux/reducers/types';

// interface StateProps {
//   propFromReduxStore: string
// }
     
interface DispatchProps {
  getAccountData: () => void
}

interface AccountProps  {
  accountData: object,
  getAccountData: () => void,
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

// Account.propTypes = {
//   accountData: object,
//   getAccountData: func,
// };

export default connect<RootState, DispatchProps>(mapStateToProps, mapDispatchToProps)(Account);
