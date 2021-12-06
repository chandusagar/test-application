import React, { useState, useContext } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
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
import AccountCircle from "@material-ui/icons/AccountCircle";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import { PanelMenu } from "primereact/panelmenu";

import { useStyles } from "../../assets/styles/Homestyle";

import Routes from "../routes/Routes";


const Home = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
 

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const listItems = () => {
    const items = [
      {
        label: "Home",
        template: (item, options) => {
          return (
            /* custom element */
            <Link
              to={"/home"}
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
        label: "IAM",
        // icon: 'pi pi-fw pi-plus',
        items: [
          {
            label: "Manage Users",
            template: (item, options) => {
              return (
                /* custom element */
                <Link
                  to={"/users"}
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
            label: "Address",
            template: (item, options) => {
              return (
                /* custom element */
                <Link
                  to={"/address"}
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
        ],
      },

      {
        label: "User List",
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
            CSR Tech
          </Typography>
          <div style={{ position: "absolute", right: "15px" }}>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={ProfilehandleMenu}
              color="inherit"
              style={{ float: "right" }}
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={openUser}
              onClose={ProfilehandleClose}
            >
              <MenuItem onClick={ProfilehandleClose}>Profile</MenuItem>
              <MenuItem onClick={ProfilehandleClose}>My account</MenuItem>
              <Link to={`/`}>
                <MenuItem onClick={ProfilehandleClose}>Logout</MenuItem>
              </Link>
            </Menu>
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

export default Home;
