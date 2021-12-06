import React from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Alert, Button, Container } from "reactstrap";
import Widget from "../../../components/Widget";
import { appLoading } from "../../../actions/layout";

import { CognitoUser } from "amazon-cognito-identity-js";
import UserPool from "../UserPool";

class Forgot extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      email: "",
      verificationCode: "",
      password: "",
      confirmPassword: "",
      stage: 1,
      errorMessage: "",
    };

    this.changeEmail = this.changeEmail.bind(this);
    this.doSendResetEmail = this.doSendResetEmail.bind(this);
    this.doSendResetPassword = this.doSendResetPassword.bind(this);
    this.changeVerificationCode = this.changeVerificationCode.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.changeConfirmPassword = this.changeConfirmPassword.bind(this);
    this.checkPassword = this.checkPassword.bind(this);
    this.isPasswordValid = this.isPasswordValid.bind(this);
  }

  changeEmail(event) {
    this.setState({ email: event.target.value });
  }

  changeVerificationCode(event) {
    this.setState({ verificationCode: event.target.value });
  }

  changePassword(event) {
    this.setState({ password: event.target.value });
  }

  changeConfirmPassword(event) {
    this.setState({ confirmPassword: event.target.value });
  }

  checkPassword() {
    if (!this.isPasswordValid()) {
      if (!this.state.password) {
        this.setState({ errorMessage: "Password field is empty" });
        this.props.dispatch(appLoading(false));
      } else {
        this.setState({ errorMessage: "Password doesn't match" });
        this.props.dispatch(appLoading(false));
      }
      setTimeout(() => {
        this.setState({ errorMessage: "" });
      }, 3 * 1000);
    }
  }

  isPasswordValid() {
    return (
      this.state.password && this.state.password === this.state.confirmPassword
    );
  }

  doSendResetEmail(e) {
    this.props.dispatch(appLoading(true));
    let _this = this;
    e.preventDefault();

    const user = new CognitoUser({
      Username: this.state.email,
      Pool: UserPool,
    });
    user.forgotPassword({
      onSuccess: function(result) {
        console.log("call result: " + result);
        _this.props.dispatch(appLoading(false));
      },
      onFailure: function(err) {
        _this.setState({ errorMessage: err.message });
        _this.props.dispatch(appLoading(false));
      },
      inputVerificationCode(data) {
        _this.setState({ stage: 2 });
        _this.props.dispatch(appLoading(false));
      },
    });
  }

  doSendResetPassword(e) {
    let _this = this;
    this.props.dispatch(appLoading(true));
    e.preventDefault();
    if (!this.isPasswordValid()) {
      this.checkPassword();
    } else {
      const user = new CognitoUser({
        Username: this.state.email,
        Pool: UserPool,
      });
      user.confirmPassword(this.state.verificationCode, this.state.password, {
        onFailure(err) {
          _this.setState({ errorMessage: err.message });
          _this.props.dispatch(appLoading(false));
        },
        onSuccess() {
          _this.props.dispatch(appLoading(false));
          _this.props.history.push("/login");
        },
      });
    }
  }

  render() {
    return (
      <div className="auth-page">
        <Container>
          <Widget
            className="widget-auth mx-auto"
            style={{
              boxShadow: "rgb(152 152 152) 0px 4px 5px 0px",
            }}
          >
            <img
              alt="Login page"
              src="/images/ness_logo.png"
              width="100"
              style={{
                margin: "auto",
                display: "block",
              }}
            />
            <h3 className="mt-0">Forgot password?</h3>
            {this.state.stage === 1 ? (
              <div>
                <p className="widget-auth-info">Please fill your email below</p>
                <form className="mt" onSubmit={this.doSendResetEmail}>
                  {this.state.errorMessage && (
                    <Alert className="alert-sm" color="danger">
                      {this.state.errorMessage}
                    </Alert>
                  )}
                  <div className="form-group">
                    <input
                      className="form-control"
                      value={this.state.email}
                      onChange={this.changeEmail}
                      type="email"
                      required
                      name="email"
                      placeholder="Email"
                    />
                  </div>
                  <Button
                    type="submit"
                    color="inverse"
                    className="auth-btn mb-3"
                    size="sm"
                  >
                    {this.props.isFetching ? "Loading..." : "Send"}
                  </Button>
                </form>
                <p className="widget-auth-info">Need to Login?</p>
                <Link className="d-block text-center" to="login"
                 style={{
                  color: "#0c1f41",
                  fontWeight: "500",
                  textDecoration:'underline'
                }}>
                  Log in
                </Link>
              </div>
            ) : (
              <div>
                <p className="widget-auth-info">Please fill below details</p>
                <form className="mt" onSubmit={this.doSendResetPassword}>
                  {this.state.errorMessage && (
                    <Alert className="alert-sm" color="danger">
                      {this.state.errorMessage}
                    </Alert>
                  )}
                  <div className="form-group">
                    <div className="form-group">
                      <input
                        className="form-control"
                        value={this.state.verificationCode}
                        onChange={this.changeVerificationCode}
                        type="text"
                        required
                        name="verificationCode"
                        placeholder="Verification Code"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        className="form-control"
                        value={this.state.password}
                        onChange={this.changePassword}
                        type="password"
                        required
                        name="password"
                        placeholder="Password"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        className="form-control"
                        value={this.state.confirmPassword}
                        onChange={this.changeConfirmPassword}
                        type="password"
                        required
                        name="confirmPassword"
                        placeholder="Confirm Password"
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    color="inverse"
                    className="auth-btn mb-3"
                    size="sm"
                  >
                    Verify &amp; Reset
                  </Button>
                </form>
              </div>
            )}
          </Widget>
        </Container>
        <footer className="auth-footer">
          {new Date().getFullYear()} &copy; DevOps Pluggable Self Service
          Portal. By{" "}
          <a
            rel="noopener noreferrer"
            target="_blank"
            style={{
              color: "#0c1f41",
              fontWeight: "600",
            }}
            href="https://www.ness.com"
          >
            Ness Digital Engineering
          </a>
        </footer>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isFetching: state.auth.isFetching,
    errorMessage: state.auth.errorMessage,
  };
}

export default withRouter(connect(mapStateToProps)(Forgot));
