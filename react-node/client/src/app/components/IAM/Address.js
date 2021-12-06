import React, { useState, useEffect, useContext } from 'react';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Radio from "@material-ui/core/Radio";
import { useForm } from "react-hook-form";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { Button } from "@material-ui/core";

import { commonStyle } from "../../../assets/styles/Commonstyle";
import { MasterContext } from "../../useContext/MasterContext";
import { addressService } from "../../services";
import DialogBox from "../../hooks/dialogBox";
import DataTable from "../../common/DataTable";
import CreateAddress from './CreateAddress'

// import { io } from 'socket.io-client';


const Address = () => {
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

  useEffect(() => {
    addressService.getAddress()
      .then((resp) => userDispatch({type:"GET_USER_ADDRESS_LIST",payload:resp}))
      .catch((err) => console.log(err))
    
  },[])
  
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
    },
    {
      field: "userId",
      header: header("User Id"),
      sortable: false,
    },
    {
      field: "address",
      header: header("Address"),
      sortable: false,

    },
    {
      field: "city",
      header: header("City"),
      sortable: false,
   
    },
    {
      field: "state",
      header: header("State"),
      sortable: false,
    },
    {
      field: "coutry",
      header: header("Country"),
      sortable: false,
    },
    {
      field: "zipcode",
      header: header("zipCode"),
      sortable: false,
    
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
    await addressService
      .deleteUser(params._id)
      .then((resp) => console.log(resp.data))
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

  console.log(state);
  
    return (
         <div className={classes.root}>
        <Paper className={classes.paper}>
           <Grid container spacing={2}>
            <Grid item lg={10} md={10} sm={6}>
              <h3>User Address</h3>
          </Grid>
           <Grid item lg={2} md={2} sm={6}>
            <Button
              className={classes.submit}
              color="primary"
              size="small"
              variant="contained"
              onClick={() => addUser()}
            >
              add Address
            </Button>
            </Grid>
            
          </Grid>
           <DataTable
          columns={columns}
          rows={state.address}
          //   filterModel={filterData()}
          modifyColums={(rowData, col) => modifyColums(rowData, col)}
          />
          
        <CreateAddress
        open={open}
        scroll={scroll}
        descriptionElementRef={descriptionElementRef}
        handleClose={handleClose}
        editList={editObj}
      />

            </Paper>
            </div>
    )
}

export default Address;