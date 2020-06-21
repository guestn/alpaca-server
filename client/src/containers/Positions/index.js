import React from 'react';
import { func, array } from 'prop-types';
import { connect } from 'react-redux';
import PositionsBox from '../../components/PositionsBox';
import actions from '../../redux/actions/index.ts';

const Positions = ({
  positions,
  getPositions,
  type,
}) => (
  <PositionsBox
    positions={positions}
    onRequestPositions={getPositions}
    type={type}
  />
);

const mapStateToProps = (state) => ({
  positions: state.positions || null,
});

const mapDispatchToProps = (dispatch) => ({
  getPositions: () => dispatch(actions.getPositions()),
});

Positions.propTypes = {
  positions: array,
  getPositions: func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Positions);
