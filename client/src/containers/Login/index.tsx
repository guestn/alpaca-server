import React from 'react';
import { connect } from 'react-redux';
import LoginForm from '../../components/LoginPage/LoginForm';
import actions from '../../redux/actions';

const Login = ({ requestLogin }) => {
    console.log('LOGIN FORM RENDER');
    
 return <LoginForm onRequestLogin={requestLogin} />
}

const mapStateToProps = (state) => ({
    accountData: state.accountData || null,
});

const mapDispatchToProps = (dispatch) => ({
    requestLogin: (params) => dispatch(actions.requestLogin(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
