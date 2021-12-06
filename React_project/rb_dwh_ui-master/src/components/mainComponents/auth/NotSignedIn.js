import React from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useAuth0 } from "@auth0/auth0-react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";

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

const NotSignedIn = (props) => {
  const classes = useStyles();
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className={classes.root}>
        <Container maxWidth="xl">
          <Grid container spacing={2}>
            <Grid item lg={12} md={12} sm={12} xs={12} xl={12}>
              <Container maxWidth="sm">
                <Paper className={classes.paper}>
                  <h2 style={{ color: "#3f51b5" }}>Not Authenticated</h2>
                  <Button
                    variant="contained"
                    color="primary"
                    size="medium"
                    style={{ marginTop: "10px" }}
                    className={classes.submit}
                    onClick={() => {
                      window.location.href = "/";
                    }}
                  >
                    Proceed to Sign In
                  </Button>
                </Paper>
              </Container>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item lg={12} md={12} sm={12} xs={12} xl={12}>
            <Container maxWidth="sm">
              <Paper className={classes.paper}>
                <h2 style={{ color: "#3f51b5" }}>Authenticated</h2>
                <Button
                  variant="contained"
                  color="primary"
                  size="medium"
                  style={{ marginTop: "10px" }}
                  className={classes.submit}
                  onClick={() => {
                    window.location.href = "/dashboard";
                  }}
                >
                  Proceed to Dashboard
                </Button>
              </Paper>
            </Container>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default withRouter(NotSignedIn);
