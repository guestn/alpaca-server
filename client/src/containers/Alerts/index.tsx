import React from 'react';
import { connect } from 'react-redux';
import AlertsBox from '../../components/AlertsPage/AlertsBox';
import actions from '../../redux/actions/index';

interface AlertsProps {
  alerts: [];
  getAlerts: () => void;
  getHistoricalData: () => void;
  historicalData: {};
  assets: [];
  getAssets: () => void;
  postAlert: ({}) => void;
  deleteAlert: (id: number) => void;
}

const Alerts = ({
  alerts,
  assets,
  getAlerts,
  getHistoricalData,
  getAssets,
  postAlert,
  deleteAlert,
  historicalData,
}: AlertsProps) => (
  <AlertsBox
    assets={assets}
    alerts={alerts}
    onRequestAlerts={getAlerts}
    onRequestHistoricalData={getHistoricalData}
    historicalData={historicalData}
    onRequestAssets={getAssets}
    onPostAlert={postAlert}
    onDeleteAlert={deleteAlert}
  />
);

const mapStateToProps = (state) => ({
  alerts: state.alerts || [],
  assets: state.assets || [],
  historicalData: state.historicalData || {},
});

const mapDispatchToProps = (dispatch) => ({
  getAlerts: () => dispatch(actions.getAlerts()),
  getHistoricalData: (params) => dispatch(actions.getHistoricalData(params)),
  getAssets: (params) => dispatch(actions.getAssets(params)),
  postAlert: (params) => dispatch(actions.postAlert(params)),
  deleteAlert: (id) => dispatch(actions.deleteAlert(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Alerts);
