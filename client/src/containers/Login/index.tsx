import React from 'react';
import { connect } from 'react-redux';
import LoginForm from '../../components/LoginPage/LoginForm';
import actions from '../../redux/actions';

const Login = ({ requestLogin }) => {
    console.log('LOGIN FORM RENDER');
    
    return <LoginForm onRequestLogin={requestLogin} />
}

const mapStateToProps = (state) => {
    
    return {
        accountData: state.accountData || null,

    }
};

const mapDispatchToProps = (dispatch) => ({
    requestLogin: (params, history) => {
        console.log({ params, history });
        
        return dispatch(actions.requestLogin(params, history))
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
