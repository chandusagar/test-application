import { makeStyles, useTheme } from "@material-ui/core/styles";


export const commonStyle = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "left",
      color: theme.palette.text.secondary,
      maxWidth: "calc(100vw - 45px)",
      overflowX: "auto",
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    btn: {
      marginRight: "10px",
  },
     submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));