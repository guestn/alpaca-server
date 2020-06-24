import React from 'react';
import { Dispatch } from 'redux'

import { connect } from 'react-redux';
import LiveQuoteStreams from '../../components/MainPage/LiveQuoteStreams';
import actions from '../../redux/actions';
import { RootState } from '../../redux/reducers/types';

interface DispatchProps {
  cancelOrder: (id: string) => {},
  getOrders: () => {}
}

interface StateProps {
  liveQuotes: LiveQuotesProps,
}

interface LiveQuotesProps {
  liveQuotes: {},
}

const LiveQuotes = ({
  liveQuotes,
}: LiveQuotesProps) => (
  <LiveQuoteStreams
    liveQuotes={liveQuotes}
  />
);

const mapStateToProps = (state: RootState): StateProps => ({
  liveQuotes: state.liveQuotes || null,
});

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchProps => ({
  cancelOrder: (id) => dispatch(actions.cancelOrder(id)),
  getOrders: () => dispatch(actions.getOrders()),
});

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(LiveQuotes);
