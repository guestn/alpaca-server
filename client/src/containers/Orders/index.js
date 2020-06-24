import React from 'react';
import { func, array, string } from 'prop-types';
import { connect } from 'react-redux';
import OrdersBox from '../../components/OrdersBox';
import actions from '../../redux/actions/index.ts';

const Orders = ({
  cancelOrder,
  notCanceled,
  orders,
  getOrders,
  type,
}) => (
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
  notCanceled: ownProps.notCanceled
});

const mapDispatchToProps = (dispatch) => ({
  cancelOrder: (id) => dispatch(actions.cancelOrder(id)),
  getOrders: () => dispatch(actions.getOrders()),
});

Orders.propTypes = {
  cancelOrder: func,
  orders: array,
  getOrders: func,
  type: string,
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
