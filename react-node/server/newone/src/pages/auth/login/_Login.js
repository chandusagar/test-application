import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Alert, Button } from 'reactstrap';
import Widget from '../../../components/Widget/Widget';
import { loginUser, receiveToken, doInit } from '../../../actions/auth';
import { push } from 'connected-react-router';

import { appLoading } from '../../../actions/layout'

import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js' 
import UserPool from '../UserPool'

class Login extends React.Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
    };

    static isAuthenticated() {

        const user = UserPool.getCurrentUser()
        if(user){

            return user;

        }else{

            return
        }
    }
    constructor(props) {
        super(props);

        this.state = {
          email: '',
          password: '',
          errorMessage: ''
        };

        this.doLogin = this.doLogin.bind(this);
        this.googleLogin = this.googleLogin.bind(this);
        this.microsoftLogin = this.microsoftLogin.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.signUp = this.signUp.bind(this);
    }


    changeEmail(event) {
        this.setState({ email: event.target.value });
    }

    changePassword(event) {
        this.setState({ password: event.target.value });
    }

    doLogin(e) {
        this.props.dispatch(appLoading(true));
        e.preventDefault();
        const user = new CognitoUser({
            Username : this.state.email,
            Pool : UserPool
        })
        const authDetails = new AuthenticationDetails({
            Username : this.state.email,
            Password : this.state.password
        })

        user.authenticateUser(authDetails,{
            onSuccess: (data) =>{

                console.log(data)
                this.props.dispatch(appLoading(false));
                window.location.reload()
            },
            onFailure : (error) =>{

                let err = error.code === "UserNotConfirmedException" ? 'Email Not Verified' : error.message
                this.setState({ errorMessage : err })
                this.props.dispatch(appLoading(false));
            },
            newPasswordRequired : (data) =>{
                console.log(data)
                this.props.dispatch(appLoading(false));
            }
        })
    }

    googleLogin() {
        this.props.dispatch(loginUser({social: "google"}));
    }

    microsoftLogin() {
        this.props.dispatch(loginUser({social: "microsoft"}));
    }

    componentDidMount() {
        const params = new URLSearchParams(this.props.location.search);
        const token = params.get('token');
        if (token) {
            this.props.dispatch(receiveToken(token));
            this.props.dispatch(doInit());
        }
    }

    signUp() {
      this.props.dispatch(push('/register'));
    }

    render() {
        return (
            <div className="auth-page">
                <Container>
                    <h5 className="auth-logo">
                        <i className="la la-circle text-primary" />
                        Ness Digital Engineering - DevSecOps Self Service Portal
                        <i className="la la-circle text-danger" />
                    </h5>
                    <Widget className="widget-auth mx-auto" title={<h3 className="mt-0">Login to your Web App</h3>}>
                        <p className="widget-auth-info">
                            Use your email to sign in.
                        </p>
                        <form className="mt" onSubmit={this.doLogin}>
                            {
                                this.state.errorMessage && (
                                    <Alert className="alert-sm" color="danger">
                                        {this.state.errorMessage}
                                    </Alert>
                                )
                            }
                            <div className="form-group">
                                <input className="form-control no-border" value={this.state.email} onChange={this.changeEmail} type="email" required name="email" placeholder="Email" />
                            </div>
                            <div className="form-group mb-0">
                                <input className="form-control no-border" value={this.state.password} onChange={this.changePassword} type="password" required name="password" placeholder="Password" />
                            </div>
                            <Link className="d-block text-right mb-3 mt-1 fs-sm" to="forgot">Forgot password?</Link>
                            <Button type="submit" color="info" className="auth-btn mb-3" size="sm">{this.props.isFetching ? 'Loading...' : 'Login'}</Button>
                        </form>
                        <p className="widget-auth-info">
                            Don't have an account? Sign up now!
                        </p>
                        <Link className="d-block text-center" to="register">Create an Account</Link>
                    </Widget>
                </Container>
                <footer className="auth-footer">
                {new Date().getFullYear()} &copy; DevOps Pluggable Self Service Portal. By <a rel="noopener noreferrer" target="_blank" href="https://www.ness.com">Ness Digital Engineering</a>
                </footer>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isFetching: state.auth.isFetching,
        isAuthenticated: state.auth.isAuthenticated,
        errorMessage: state.auth.errorMessage,
    };
}

export default withRouter(connect(mapStateToProps)(Login));

