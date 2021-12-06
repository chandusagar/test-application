import React, { useState, useEffect, useContext } from 'react';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Radio from "@material-ui/core/Radio";
import { useForm } from "react-hook-form";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import DataTable from "../../common/DataTable";
import EditIcon from "@material-ui/icons/Edit";
import { Button } from "@material-ui/core";

import { commonStyle } from "../../../assets/styles/Commonstyle";

import { io } from 'socket.io-client';


const Chat = () => {
      const classes = commonStyle();
  const methods = useForm();
  
    // useEffect(() => {
    //   // let socket = io("http://localhost:5000");
    //   const socket = io("ws://localhost:5000");
    //     socket.on('connect', () => {
    //       console.log("connect new server",socket.id);
    //      socket.emit("message","This is chandu")

    //     })
    //  socket.on("message", (data) => {
    //         console.log(data);
    //       })
      
    // }, []);
  
 
  // const send = () => {
  //     const socket = io("ws://localhost:5000");
  //       socket.on('connect', () => {
  //         console.log("connect new server", socket.id);
  //         let obj = {id:socket.id,name:"chandu",message:"Hi this is chandu"}
  //         socket.emit("message", obj)
  //       })
  // }
 


    
    return (
         <div className={classes.root}>
            <Paper className={classes.paper}>
            <Grid item lg={11} md={10} sm={6}>
            <h3>User Address</h3>
            {/* <button onClick={send}>message</button> */}
          </Grid>
            </Paper>
            </div>
    )
}

export default Chat;

