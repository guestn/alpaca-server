import React from 'react';
import { func, array, string } from 'prop-types';
import { connect } from 'react-redux';
import LiveQuoteStreams from '../../components/MainPage/LiveQuoteStreams';
import actions from '../../redux/actions/index.ts';

const LiveQuotes = ({
  liveQuotes,
}) => (
  <LiveQuoteStreams
    liveQuotes={liveQuotes}
  />
);

const mapStateToProps = (state) => ({
  liveQuotes: state.liveQuotes || null,
});

const mapDispatchToProps = (dispatch) => ({
  cancelOrder: (id) => dispatch(actions.cancelOrder(id)),
  getOrders: () => dispatch(actions.getOrders()),
});

LiveQuotes.propTypes = {
  //liveQuotes: array,
};

export default connect(mapStateToProps, mapDispatchToProps)(LiveQuotes);
