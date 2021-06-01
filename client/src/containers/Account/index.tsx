import React from 'react';
import { connect, MapStateToProps, DefaultRootState } from 'react-redux';
import { Dispatch } from 'redux';

import AccountBox from '../../components/MainPage/AccountBox';
import actions from '../../redux/actions';
import { RootState } from '../../redux/reducers/types';

interface DispatchFromProps {
    getAccountData: () => {};
}
export interface AccountData {
    buying_power: string;
    cash: string;
    portfolio_value: string;
}
interface AccountProps extends ConnectedAccountProps {
    accountData?: AccountData | null;
    getAccountData: () => {};
}

interface ConnectedAccountProps {};

const Account = ({ accountData, getAccountData }: AccountProps) => (
    <AccountBox accountData={accountData || undefined} onRequestAccountData={getAccountData} />
);

const mapStateToProps = (state: RootState) => ({
    accountData: state.accountData || null,
});

const mapDispatchToProps = (dispatch: any): DispatchFromProps => ({
    getAccountData: () => dispatch(actions.getAccountData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Account);
