import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { useForm } from "react-hook-form";

import SigninValidation from "../../common/validations/signin";

import TextFieldGroup from "../../common/TextFiendGroup";
import { signinService, userService } from "../../services";
import jwt_decode from 'jwt-decode'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    margin: "80px auto",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Signin = (props) => {
  const classes = useStyles();
  const methods = useForm();
  const { control, handleSubmit, setValue, reset } = methods;

  useEffect(() => {
    userService
      .userList()
      .then((resp) => console.log(resp.data))
      .catch((err) => console.log(err));
  }, []);

  const login = (data) => {
    signinService
      .Signin(data)
      .then((resp) => {
        // window.location.pathname = "/home";
        const token = resp.token;
        let user = jwt_decode(token);
        console.log(user);
        localStorage.setItem("accessToken", token,"user", JSON.stringify(user));
        // localStorage.setItem("accessToken", token);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={classes.root}>
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item lg={12} md={12} sm={12} xs={12} xl={12}>
            <Container maxWidth="sm">
              <Paper className={classes.paper}>
                <h2 style={{ color: "#3f51b5" }}>Log in your application</h2>
                <form>
                  <Grid item sm={12} spacing={2}>
                    <TextFieldGroup
                      type="email"
                      name="email"
                      control={control}
                      defaultValue={""}
                      label="User Name"
                      className={classes.textField}
                      margin="dense"
                      variant="outlined"
                      rules={SigninValidation.userId}
                    />
                  </Grid>

                  <Grid item sm={12} spacing={2}>
                    <TextFieldGroup
                      type="password"
                      name="password"
                      control={control}
                      defaultValue={""}
                      label="Password"
                      className={classes.textField}
                      margin="dense"
                      variant="outlined"
                      rules={SigninValidation.password}
                    />
                    {/* <FormHelperText >{helperText}</FormHelperText> */}
                  </Grid>

                  <Button
                    variant="contained"
                    color="primary"
                    size="medium"
                    style={{ marginTop: "10px" }}
                    className={classes.submit}
                    onClick={handleSubmit(login)}
                    //   onClick={() => loginWithRedirect()}
                  >
                    Log In
                  </Button>
                </form>
              </Paper>
            </Container>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default withRouter(Signin);
