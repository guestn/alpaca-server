import React from 'react';
import { array, func, object } from 'prop-types';
import { connect } from 'react-redux';
import MainContainer from '../../components/MainContainer';
import actions from '../../redux/actions/index.ts';
import { Asset, Clock, HistoricalData, LiveData, User } from '../../redux/reducers/types';

interface AppProps {
    assets: Asset[];
    clock: Clock;
    createOrder: () => void,
    error: {},
    getAssets: () => void
    getClock: () => void,
    getHistoricalData: () => void;
    historicalData: HistoricalData;
    liveData: LiveData;
    notifications: Notification[];
    requestLogout: () => void;
    user: User;
}

const App = ({
    assets,
    clock,
    createOrder,
    error,
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
        error={error}
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

const mapStateToProps = (state) => ({
    assets: state.assets || [],
    clock: state.clock || null,
    historicalData: state.historicalData || {},
    liveData: state.liveData || null,
    notifications: state.notifications || [],
    user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
    getClock: () => dispatch(actions.getClock()),
    getAssets: () => dispatch(actions.getAssets()),
    getHistoricalData: (params) => dispatch(actions.getHistoricalData(params)),
    createOrder: (params) => dispatch(actions.createOrder(params)),
    requestLogout: (params) => dispatch(actions.requestLogout(params)),
});

App.propTypes = {
    clock: object,
    createOrder: func,
    error: object,
    firebase: object,
    getClock: func,
    getHistoricalData: func,
    liveData: object,
    notifications: array,
    historicalData: object,
    user: object,
    requestLogout: func,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
