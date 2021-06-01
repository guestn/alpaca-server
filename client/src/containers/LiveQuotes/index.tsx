import React from 'react';
import { connect } from 'react-redux';
import LiveQuoteStreams from '../../components/MainPage/LiveQuoteStreams';
import actions from '../../redux/actions';
import { RootState } from '../../redux/reducers/types';

interface DispatchProps {
    cancelOrder: (id: string) => {};
    getOrders: () => {};
}
interface LiveQuotesProps {
    liveQuotes: {};
}

const LiveQuotes = ({ liveQuotes }: LiveQuotesProps) => <LiveQuoteStreams liveQuotes={liveQuotes} />;

const mapStateToProps = (state: RootState) => ({
    liveQuotes: state.liveQuotes || null,
});

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
    cancelOrder: (id) => dispatch(actions.cancelOrder(id)),
    getOrders: () => dispatch(actions.getOrders()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LiveQuotes);
