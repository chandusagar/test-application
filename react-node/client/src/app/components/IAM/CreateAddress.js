import React, { useState, useEffect, useContext } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import Grid from "@material-ui/core/Grid";
import { useForm, Controller } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import Swal from "sweetalert2";

import { commonStyle } from "../../../assets/styles/Commonstyle";

import TextFieldGroup from "../../common/TextFiendGroup";
import { addressService } from "../../services";

import isEmpty from "../../utilitis/isEmpty";

const CreateAddress = ({
  open,
  scroll,
  descriptionElementRef,
  handleClose,
  editList,
}) => {
  const classes = commonStyle();
  const methods = useForm();
  const { control, handleSubmit, setValue, reset } = methods;

  useEffect(() => {
    const value = Object.values(editList);
    if (!isEmpty(editList)) {
      const value = Object.values(editList);
      Object.keys(editList).map((item, i) => setValue(item, value[i]));
    } else {
      reset({});
    }
  }, [editList]);

    const save = (data) => {
        let userInfo = localStorage.getItem("user");
        let user = JSON.parse(userInfo);
        data.userId = user._id;
        console.log(data);
    addressService
      .create(data)
      .then((resp) => handleClose())
      .catch((err) => console.log(err));
  };

  const update = (data) => {
    let id = data._id;
    addressService
      .update(id, data)
      .then((resp) => handleClose())
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Dialog
        maxWidth="lg"
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          {!isEmpty(editList) ? "Edit Address" : "Create Address"}
        </DialogTitle>
        <form>
          <DialogContent dividers={scroll === "paper"}>
            <DialogContentText
              id="scroll-dialog-description"
              ref={descriptionElementRef}
              tabIndex={-1}
            >
              <Grid container spacing={2}>
                <Grid item lg={4} md={6} sm={12}>
                  <TextFieldGroup
                    name="address"
                    control={control}
                    defaultValue={""}
                    label="Address"
                    className={classes.textField}
                    margin="dense"
                    variant="outlined"
                    //   rules={SupplierBrandsValidation.brand}
                  />
                </Grid>
                <Grid item lg={4} md={6} sm={12}>
                  <TextFieldGroup
                    name="city"
                    control={control}
                    defaultValue={""}
                    label="City"
                    className={classes.textField}
                    margin="dense"
                    variant="outlined"
                  />
                </Grid>
                <Grid item lg={4} md={6} sm={12}>
                  <TextFieldGroup
                    name="state"
                    control={control}
                    defaultValue={""}
                    label="State"
                    className={classes.textField}
                    margin="dense"
                    variant="outlined"
                  />
                </Grid>
                <Grid item lg={4} md={6} sm={12}>
                  <TextFieldGroup
                    name="country"
                    control={control}
                    defaultValue={""}
                    label="Country"
                    className={classes.textField}
                    margin="dense"
                    variant="outlined"
                  />
                </Grid>
                <Grid item lg={4} md={6} sm={12}>
                  <TextFieldGroup
                    name="zipcode"
                    control={control}
                    defaultValue={""}
                    label="ZipCode"
                    className={classes.textField}
                    margin="dense"
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>

            {!isEmpty(editList) ? (
              <Button onClick={handleSubmit(update)} color="primary">
                Update
              </Button>
            ) : (
              <Button onClick={handleSubmit(save)} color="primary">
                Save
              </Button>
            )}
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default CreateAddress;
