import React, { useState, useEffect, useContext } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Radio from "@material-ui/core/Radio";
import { useForm } from "react-hook-form";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { Button } from "@material-ui/core";

import { commonStyle } from "../../../assets/styles/Commonstyle";
import isEmpty from "../../utilitis/isEmpty";
import CreateUser from "./CreateUser";
import { MasterContext } from "../../useContext/MasterContext";
import { userService } from "../../services";
import DialogBox from "../../hooks/dialogBox";
import DataTable from "../../common/DataTable";

import { useSelector, useDispatch } from 'react-redux';
import {user} from '../../redux/actions/userAction';

const Users = () => {
  const classes = commonStyle();
  const methods = useForm();

  const { state, userDispatch } = useContext(MasterContext);
  const [
    open,
    scroll,
    editObj,
    editList,
    handleClose,
    addUser,
    descriptionElementRef,
  ] = DialogBox();

  const testlist = useSelector((store) => store.users); 
  useDispatch(user.userList());
  console.log(testlist);

  useEffect(() => {
    userService
      .userList()
      .then((resp) => {
        userDispatch({ type: "GET_USER_LIST", payload: resp });
      }, [])
      .catch((err) => console.log(err));
  }, []);

  const header = (head) => {
    return (
      <span className="p-column-title" style={{ width: "60%", float: "left" }}>
        <div>
          <span className="p-column-title token-anchor">{head} </span>
        </div>
      </span>
    );
  };

  const columns = [
    {
      field: "_id",
      header: header("ID"),
      sortable: true,
      // headerStyle: { width: "100px" },
    },
    {
      field: "firstName",
      header: header("First Name"),
      sortable: false,
      // headerStyle: { width: "100px" },
    },
    {
      field: "lastName",
      header: header("Last Name"),
      sortable: false,
      // headerStyle: { width: "100px" },
    },
    {
      field: "email",
      header: header("Email"),
      sortable: false,
      // headerStyle: { width: "100px" },
    },
    {
      field: "mobileNo",
      header: header("Mobile No"),
      sortable: false,
      // headerStyle: { width: "150px" },
    },
    {
      field: "roles",
      header: header("Roles"),
      sortable: false,
      // headerStyle: { width: "150px" },
    },
    {
      field: "created",
      header: header("Created"),
      sortable: false,
      // headerStyle: { width: "100px" },
    },

    {
      field: "",
      header: "",
      sortable: false,
      headerStyle: { width: "100px" },
    },
  ];

  const deleteUser = async (params) => {
    console.log(params);
    await userService
      .deleteUser(params._id)
      .then((resp) => console.log(resp))
      .catch((err) => console.log(err));
  };

  const actionButton = (params) => {
    return (
      <div>
        <IconButton
          aria-label="edit"
          style={{ color: "#2196f3" }}
          size="small"
          onClick={editList(params)}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          aria-label="delete"
          style={{ color: "#ff5722" }}
          size="small"
          onClick={() => deleteUser(params)}
        >
          <DeleteIcon />
        </IconButton>
      </div>
    );
  };

  const modifyColums = (rowData, col) => {
    switch (col.field) {
      case "":
        return actionButton(rowData);
      default:
        return <div className="token-anchor">{rowData[col.field]}</div>;
    }
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item lg={10} md={10} sm={6}>
            <h3>User List</h3>
          </Grid>
          <Grid item lg={2} md={2} sm={6}>
            <Button
              className={classes.submit}
              color="primary"
              size="small"
              variant="contained"
              onClick={() => addUser()}
            >
              add user
            </Button>
          </Grid>

        </Grid>
        <DataTable
          columns={columns}
          rows={state.userList}
          //   filterModel={filterData()}
          modifyColums={(rowData, col) => modifyColums(rowData, col)}
        />
      </Paper>

      <CreateUser
        open={open}
        scroll={scroll}
        descriptionElementRef={descriptionElementRef}
        handleClose={handleClose}
        editList={editObj}
      />
    </div>
  );
};

export default Users;
