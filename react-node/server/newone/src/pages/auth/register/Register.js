import React from "react";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { Container, Alert, Button } from "reactstrap";
import Widget from "../../../components/Widget";
import { authError } from "../../../actions/auth";
import { appLoading } from "../../../actions/layout";
import UserPool from "../UserPool";

class Register extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
    };

    this.doRegister = this.doRegister.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.changeConfirmPassword = this.changeConfirmPassword.bind(this);
    this.checkPassword = this.checkPassword.bind(this);
    this.isPasswordValid = this.isPasswordValid.bind(this);
  }

  changeEmail(event) {
    this.setState({ email: event.target.value });
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
        this.props.dispatch(authError("Password field is empty"));
        this.props.dispatch(appLoading(false));
      } else {
        this.props.dispatch(authError("Password doesn't match"));
        this.props.dispatch(appLoading(false));
      }
      setTimeout(() => {
        this.props.dispatch(authError());
      }, 3 * 1000);
    }
  }

  isPasswordValid() {
    return (
      this.state.password && this.state.password === this.state.confirmPassword
    );
  }

  doRegister(e) {
    e.preventDefault();
    this.props.dispatch(appLoading(true));
    if (!this.isPasswordValid()) {
      this.checkPassword();
    } else {
      UserPool.signUp(
        this.state.email,
        this.state.password,
        [],
        null,
        (err, data) => {
          if (err) {
            let error =
              err.code !== "UsernameExistsException"
                ? err.message.split(":")[1]
                : err.message;
            this.props.dispatch(authError(error));
            setTimeout(() => {
              this.props.dispatch(authError());
            }, 3 * 1000);
            this.props.dispatch(appLoading(false));
          } else {
            this.props.dispatch(
              authError(
                "Successfully Registered , Verification Email Has Been Sent."
              )
            );
            setTimeout(() => {
              // this.props.dispatch(authError());
              this.setState({ email: "", password: "", confirmPassword: "" });
              this.props.dispatch(appLoading(false));
            }, 4 * 1000);
          }
        }
      );
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
            <h3 className="mt-0">Create an account</h3>
            <p className="widget-auth-info">Please fill all fields below</p>
            <form className="mt" onSubmit={this.doRegister}>
              {this.props.errorMessage && (
                <Alert className="alert-sm" color="danger">
                  {this.props.errorMessage}
                </Alert>
              )}
              <div className="form-group">
                <input
                  className="form-control"
                  value={this.state.email}
                  onChange={this.changeEmail}
                  type="text"
                  required
                  name="email"
                  placeholder="Email"
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
                  onBlur={this.checkPassword}
                  type="password"
                  required
                  name="confirmPassword"
                  placeholder="Confirm"
                />
              </div>
              <Button
                type="submit"
                color="inverse"
                className="auth-btn mb-3"
                size="sm"
              >
                {this.props.isFetching ? "Loading..." : "Register"}
              </Button>
            </form>
            <p className="widget-auth-info">Already have the account?</p>
            <Link className="d-block text-center" to="login"
            style={{
                color: "#0c1f41",
                fontWeight: "500",
                textDecoration:'underline'
              }}
            >
              Log in
            </Link>
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

export default withRouter(connect(mapStateToProps)(Register));
