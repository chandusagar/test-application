import React from "react";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { Alert, Row, Col, Input } from "reactstrap";
import { loginUser, receiveToken, doInit } from "../../../actions/auth";
import { push } from "connected-react-router";
import { appLoading } from "../../../actions/layout";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import UserPool from "../UserPool";
import { Button } from "react-bootstrap";
import "./login.modules.scss";

class Login extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  static isAuthenticated() {
    const user = UserPool.getCurrentUser();
    if (user) {
      return user;
    } else {
      return;
    }
  }
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      errorMessage: "",
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
      Username: this.state.email,
      Pool: UserPool,
    });
    const authDetails = new AuthenticationDetails({
      Username: this.state.email,
      Password: this.state.password,
    });

    user.authenticateUser(authDetails, {
      onSuccess: (data) => {
        console.log(data);
        this.props.dispatch(appLoading(false));
        window.location.reload();
      },
      onFailure: (error) => {
        let err =
          error.code === "UserNotConfirmedException"
            ? "Email Not Verified"
            : error.message;
        this.setState({ errorMessage: err });
        this.props.dispatch(appLoading(false));
      },
      newPasswordRequired: (data) => {
        console.log(data);
        this.props.dispatch(appLoading(false));
      },
    });
  }

  googleLogin() {
    this.props.dispatch(loginUser({ social: "google" }));
  }

  microsoftLogin() {
    this.props.dispatch(loginUser({ social: "microsoft" }));
  }

  componentDidMount() {
    const params = new URLSearchParams(this.props.location.search);
    const token = params.get("token");
    if (token) {
      this.props.dispatch(receiveToken(token));
      this.props.dispatch(doInit());
    }
  }

  signUp() {
    this.props.dispatch(push("/register"));
  }

  render() {
    return (
      <div className="auth-page" style={{ paddingTop: 0 }}>
        <Row>
          <Col xs={0} sm={6} md={6} lg={6}>
            <img
              alt="Login page"
              src="/images/login_left_full.jpg"
              width="100%"
            />
            <Row className="left-buttons">
              <Col xs={0} sm={6} md={6} lg={6} className="left-buttons-b1width">
                <Button type="button" className="left-buttons-button">
                  Get Started
                </Button>
              </Col>
              <Col xs={0} sm={6} md={6} lg={6}>
                <Button type="button" className="left-buttons-button">
                  View Demo
                </Button>
              </Col>
            </Row>
          </Col>
          <Col xs={0} sm={6} md={6} lg={6}>
            <Row>
              <img
                alt="Login page"
                src="/images/ness_logo.png"
                width="100"
                className="right-ness-logo"
              />
            </Row>
            <Row className="right-user-icon">
              <div
                style={{
                  margin: "auto",
                }}
              >
                <img alt="Login page" src="/images/user.png" width="75" />
              </div>
            </Row>
            <Row className="right-user-icon">
              <div
              >
                <h5>Use your email to sign in.</h5>
                <form className="mt" onSubmit={this.doLogin}>
                  {this.state.errorMessage && (
                    <Alert className="alert-sm" color="danger">
                      {this.state.errorMessage}
                    </Alert>
                  )}
                  <div className="form-group">
                    <Input
                      className="form-control spacing"
                      value={this.state.email}
                      onChange={this.changeEmail}
                      type="email"
                      required
                      name="email"
                      placeholder="Email"
                    />
                  </div>
                  <div className="form-group mb-0">
                    <Input
                      className="form-control spacing"
                      value={this.state.password}
                      onChange={this.changePassword}
                      type="password"
                      required
                      name="password"
                      placeholder="Password"
                    />
                  </div>
                  <Link
                    className="d-block text-right mb-3 mt-1 fs-sm spacing"
                    to="forgot"
                    style={{
                      color: "#0c1f41",
                      fontWeight: "500",
                      textDecoration:'underline'                      
                    }}
                  >
                    Forgot password?
                  </Link>
                  <Button
                    type="submit"
                    className="right-submit"
                  >
                    {this.props.isFetching ? "Loading..." : "Login"}
                  </Button>
                </form>
                <div className="right-create-link"
                  style={{

                  }}
                >
                  <span className="widget-auth-info">
                    Don't have an account? Sign up now!
                  </span>
                  <Link
                    className="d-block text-center"
                    to="register"
                    style={{
                      color: "#0c1f41",
                      fontWeight: "500",
                      textDecoration:'underline'
                    }}
                  >
                    Create an Account
                  </Link>
                </div>
              </div>
            </Row>
            <Row className="right-footer">
              <div
              >
                {new Date().getFullYear()} &copy; DevOps Pluggable Self Service
                Portal. By
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://www.ness.com"
                  style={{
                    color: "#0c1f41",
                    fontWeight: "600",
                  }}
                >
                  &nbsp;Ness Digital Engineering
                </a>
              </div>
            </Row>
          </Col>
        </Row>
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
