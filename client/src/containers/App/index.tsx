import React from 'react';
import { connect } from 'react-redux';
import MainContainer from '../../components/MainContainer';
import actions from '../../redux/actions';
import { GetHistoricalDataParams } from '../../redux/actions/getHistoricalData';
import { CreateOrderParams } from '../../redux/actions/createOrder';
import { History } from 'history';
import { Asset, Clock, HistoricalData, LiveData, Notification, RootState, User } from '../../redux/reducers/types';

interface AppProps {
    assets: Asset[];
    clock: Clock | null;
    createOrder: (params: CreateOrderParams) => void,
    error: {},
    getAssets: () => void
    getClock: () => void,
    getHistoricalData: (getHistoricalDataParams: GetHistoricalDataParams) => void;
    historicalData: HistoricalData;
    liveData: LiveData | null;
    notifications: Notification[];
    requestLogout: ({ history }: { history: History }) => void;
    user: User | null;
}

const App = ({
    assets,
    clock,
    createOrder,
    getAssets,
    getClock,
    getHistoricalData,
    historicalData,
    liveData,
    notifications,
    requestLogout,
    user,
}: AppProps) => (
    <MainContainer
        assets={assets}
        clock={clock}
        historicalData={historicalData}
        liveData={liveData}
        notifications={notifications}
        onCreateOrder={createOrder}
        onRequestAssets={getAssets}
        onRequestClock={getClock}
        onRequestHistoricalData={getHistoricalData}
        onRequestLogout={requestLogout}
        user={user}
    />
);

const mapStateToProps = (state: RootState) => ({
    assets: state.assets || [],
    clock: state.clock || null,
    historicalData: state.historicalData || {},
    liveData: state.liveData || null,
    notifications: state.notifications || [],
    user: state.user || null,
});

const mapDispatchToProps = (dispatch: any) => ({
    getClock: () => dispatch(actions.getClock()),
    getAssets: () => dispatch(actions.getAssets()),
    getHistoricalData: (params: GetHistoricalDataParams) => dispatch(actions.getHistoricalData(params)),
    createOrder: (params: CreateOrderParams) => dispatch(actions.createOrder(params)),
    requestLogout: (params: { history: History }) => dispatch(actions.requestLogout(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
