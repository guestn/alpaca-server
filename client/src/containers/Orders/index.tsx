import React from 'react';
import { func, array, string } from 'prop-types';
import { connect } from 'react-redux';
import OrdersBox from '../../components/OrdersBox';
import actions from '../../redux/actions';

interface OrdersProps {
    cancelOrder: (id: string) => void;
    notCanceled: boolean;
    orders: [];
    getOrders: () => void;
    type: string;
}

const Orders = ({ cancelOrder, notCanceled, orders, getOrders, type }: OrdersProps) => (
    <OrdersBox
        notCanceled={notCanceled}
        onCancelOrder={cancelOrder}
        orders={orders}
        onRequestOrders={getOrders}
        type={type}
    />
);

const mapStateToProps = (state, ownProps) => ({
    orders: state.orders || null,
    notCanceled: ownProps.notCanceled,
});

const mapDispatchToProps = (dispatch) => ({
    cancelOrder: (id: string) => dispatch(actions.cancelOrder(id)),
    getOrders: () => dispatch(actions.getOrders()),
});

Orders.propTypes = {
    cancelOrder: func,
    orders: array,
    getOrders: func,
    type: string,
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
