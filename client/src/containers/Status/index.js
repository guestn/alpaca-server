import React from 'react';
import { func, object } from 'prop-types';
import { connect } from 'react-redux';
import StatusBar from '../../components/StatusBar';
import actions from '../../redux/actions/index.ts';

const Status = ({
  connectionStatus,
}) => (
  <StatusBar
    connectionStatus={connectionStatus}
  />
);

const mapStateToProps = (state) => ({
  connectionStatus: state.connectionStatus || null,
});

const mapDispatchToProps = (dispatch) => ({
  ///getAccountData: () => dispatch(actions.getAccountData()),
});

Status.propTypes = {
  connectionStatus: object,
};

export default connect(mapStateToProps, mapDispatchToProps)(Status);
