import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import MenuItem from "@material-ui/core/MenuItem";

import { PanelMenu } from "primereact/panelmenu";

import Routes from "../routes/Routes";

import { Mastercontext } from "../useContext/MasterContext";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  NavItem: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const Container = () => {
  const { logout } = useAuth0();
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const { masterData, setMasterData } = useContext(Mastercontext);

  const handleDrawerOpen = () => {
    setOpen(true);
    setMasterData({ ...masterData, setOpen: true });
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setMasterData({ ...masterData, setOpen: false });
  };

  const listItems = () => {
    const items = [
      {
        label: "Home",
        template: (item, options) => {
          return (
            /* custom element */
            <Link
              to={"/dashboard"}
              className={options.className}
              target={item.target}
              style={{ color: "#3f51b5" }}
            >
              <span className={"pi pi-fw pi-home"}></span>
              <span className={options.labelClassName}>{item.label}</span>
            </Link>
          );
        },
      },

      {
        label: "Retailer Setting",
        template: (item, options) => {
          return (
            /* custom element */
            <Link
              to={"/retailer"}
              className={options.className}
              target={item.target}
              style={{ color: "#3f51b5" }}
            >
              {/* <span className={"pi pi-fw pi-plus"}></span> */}
              <span className={options.labelClassName}>{item.label}</span>
            </Link>
          );
        },
      },

      {
        label: "Brand Suppliers",
        template: (item, options) => {
          return (
            /* custom element */
            <Link
              to={"/supplier"}
              className={options.className}
              target={item.target}
              style={{ color: "#3f51b5" }}
            >
              {/* <span className={"pi pi-fw pi-plus"}></span> */}
              <span className={options.labelClassName}>{item.label}</span>
            </Link>
          );
        },
      },
    ];

    return (
      <div className="card">
        <PanelMenu model={items} style={{ width: "100%" }} />
      </div>
    );
  };

  /* Profile list */
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openUser = Boolean(anchorEl);

  const ProfilehandleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const ProfilehandleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            ReserveBar–Retailer Setting
          </Typography>
          <div style={{ position: "absolute", right: "15px" }}>
            <Link to={`/`} style={{ color: "#fff" }}>
              <MenuItem onClick={logout}>Logout</MenuItem>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          className={classes.NavItem}
        >
          {listItems()}
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <Routes />
      </main>
    </div>
  );
};

export default Container;
