import React from 'react';
import { func, object } from 'prop-types';
import { connect } from 'react-redux';
import LoginForm from '../../components/LoginPage/LoginForm';
import actions from '../../redux/actions/index.ts';

const Login = ({
  requestLogin,
  firebase,
}) => (
  <LoginForm
    onRequestLogin={requestLogin}
    firebase={firebase}
  />
);

const mapStateToProps = (state) => ({
  accountData: state.accountData || null,
});

const mapDispatchToProps = (dispatch) => ({
  requestLogin: (params) => dispatch(actions.requestLogin(params)),
});

Login.propTypes = {
  firebase: object,
  requestLogin: func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
