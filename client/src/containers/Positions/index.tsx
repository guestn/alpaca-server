import React from 'react';
import { connect } from 'react-redux';
import PositionsBox from '../../components/PositionsBox';
import actions from '../../redux/actions';

interface PositionsProps {
    positions: [];
    getPositions: () => void;
    type: string;
}

const Positions = ({ positions, getPositions, type }: PositionsProps) => (
    <PositionsBox positions={positions} onRequestPositions={getPositions} type={type} />
);

const mapStateToProps = (state) => ({
    positions: state.positions || null,
});

const mapDispatchToProps = (dispatch) => ({
    getPositions: () => dispatch(actions.getPositions()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Positions);
