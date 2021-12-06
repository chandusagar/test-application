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
import { useAuth0 } from "@auth0/auth0-react";

import TextFieldGroup from "../../common/TextFieldGroup";

import { supplierService } from "../../../services";

import SupplierBrandsValidation from "../../common/validations/supplierBrands";

import { Mastercontext } from "../../useContext/MasterContext";

const useStyles = makeStyles((theme) => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  btn: {
    marginRight: "10px",
  },
}));

const filter = createFilterOptions();

const AddSupplier = ({
  open,
  scroll,
  descriptionElementRef,
  handleClose,
  editFlag,
  selectedData,
  suppliersList,
  unmappedBrands,
  serviceFun,
  setUNmappedBrands,
}) => {
  const classes = useStyles();
  const methods = useForm();
  const { isAuthenticated, isLoading } = useAuth0();
  const { control, handleSubmit, setValue, reset } = methods;
  const [supplier, setSupplier] = useState({});
  const { masterData } = useContext(Mastercontext);

  useEffect(() => {
    if (selectedData) {
      setSupplier({ supplier: selectedData.supplier });
      setValue("brand", selectedData.brand);
    } else if (!selectedData) {
      reset({
        supplier: "",
        brand: "",
      });
      setSupplier({});
    }
  }, [selectedData]);

  const save = async (data) => {
    // console.log(data);
    data.supplier = supplier.supplier;
    let Data = data;
    await supplierService
      .addSupplier(Data, masterData.accessToken)
      .then((response) => {
        Swal.fire({
          title: "Success!",
          text: response.data.message,
          icon: "success",
          confirmButtonText: "Ok",
        }).then((result) => {
          if (result.isConfirmed) {
            handleClose();
            serviceFun();
            setUNmappedBrands(false);
          }
        });
      })
      .catch((err) => {
        if (err.isError) {
          Swal.fire({
            title: "Error!",
            text: err.message,
            icon: "error",
            confirmButtonText: "Ok",
          });
        }
      });
  };

  const update = async (data) => {
    data.supplier = supplier.supplier;
    let id = data.brand;
    let Data = data;
    if (unmappedBrands) {
      await supplierService
        .addSupplierUnmappedBrands(Data, masterData.accessToken)
        .then((response) => {
          Swal.fire({
            title: "Success!",
            text: response.data.message,
            icon: "success",
            confirmButtonText: "Ok",
          }).then((result) => {
            if (result.isConfirmed) {
              handleClose();
              serviceFun();
              setUNmappedBrands(false);
            }
          });
        })
        .catch((err) => {
          if (err.isError) {
            Swal.fire({
              title: "Error!",
              text: err.message,
              icon: "error",
              confirmButtonText: "Ok",
            });
          }
        });
    } else {
      await supplierService
        .updateSupplier(id, Data, masterData.accessToken)
        .then((response) => {
          Swal.fire({
            title: "Success!",
            text: response.data.message,
            icon: "success",
            confirmButtonText: "Ok",
          }).then((result) => {
            if (result.isConfirmed) {
              handleClose();
              serviceFun();
            }
          });
        })
        .catch((err) => {
          if (err.response && err.response.isError) {
            Swal.fire({
              title: "Error!",
              text: err.response.data.message,
              icon: "error",
              confirmButtonText: "Ok",
            });
          }
        });
    }
  };

  if (isLoading || !isAuthenticated) {
    return null;
  }

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
          {editFlag === "Edit" ? "Edit Supplier" : "Add New Brand"}
        </DialogTitle>
        <form>
          <DialogContent dividers={scroll === "paper"}>
            <DialogContentText
              id="scroll-dialog-description"
              ref={descriptionElementRef}
              tabIndex={-1}
            >
              <Grid container spacing={2} style={{ width: "800px" }}>
                <Grid item sm={6}>
                  <TextFieldGroup
                    name="brand"
                    control={control}
                    defaultValue={""}
                    label="Brand"
                    className={classes.textField}
                    disabled={editFlag === "Edit" ? true : false}
                    margin="dense"
                    variant="outlined"
                    rules={SupplierBrandsValidation.brand}
                  />
                </Grid>

                <Grid item sm={6}>
                  <Autocomplete
                    size="small"
                    value={supplier}
                    onChange={(event, newValue) => {
                      if (typeof newValue === "string") {
                        setSupplier({
                          supplier: newValue,
                        });
                      } else if (newValue && newValue.inputValue) {
                        // Create a new value from the user input
                        setSupplier({
                          supplier: newValue.inputValue,
                        });
                      } else {
                        setSupplier(newValue);
                      }
                    }}
                    filterOptions={(options, params) => {
                      const filtered = filter(options, params);
                      // Suggest the creation of a new value
                      if (params.inputValue !== "") {
                        filtered.push({
                          inputValue: params.inputValue,
                          supplier: `Add "${params.inputValue}"`,
                        });
                      }

                      return filtered;
                    }}
                    options={suppliersList}
                    getOptionLabel={(option) => option.supplier}
                    freeSolo
                    renderInput={(params) => (
                      <Controller
                        render={({ fieldState: { error } }) => (
                          <TextField
                            {...params}
                            label="supplier"
                            placeholder="Supplier"
                            margin="dense"
                            variant="outlined"
                            error={!!error}
                            helperText={error ? error.message : null}
                          />
                        )}
                        name="supplier"
                        control={control}

                        // rules={SupplierBrandsValidation.supplier}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>

            {editFlag === "Edit" ? (
              <Button
                onClick={handleSubmit(update)}
                color="primary"
                disabled={supplier && supplier.supplier ? false : true}
              >
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

export default AddSupplier;
