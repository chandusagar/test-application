import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import Radio from "@material-ui/core/Radio";
import Autocomplete from "@material-ui/lab/Autocomplete";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import { useAuth0 } from "@auth0/auth0-react";

import { useForm } from "react-hook-form";

import { supplierService } from "../../../services";

import DataTable from "../../common/DataTable";
import CheckBox from "../../common/CheckBox";

import AddSupplier from "./AddSupplier";

import { Mastercontext } from "../../useContext/MasterContext";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  btn: {
    marginRight: "10px",
  },
}));

const Supplier = () => {
  const classes = useStyles();
  const methods = useForm();
  const { isAuthenticated, isLoading } = useAuth0();
  const { control, handleSubmit } = methods;
  const [supplier, setSupplier] = useState([]);

  const [supplierSearchObj, setSupplierSearchObj] = useState({});
  const [selectedValue, setSelectedValue] = React.useState({});
  const [searchObj, setSearchObj] = useState({});
  const [supplierName, setSupplierName] = useState({});
  const [brandName, setBrandName] = useState({});
  const [unmapped_brands, setUNmappedBrands] = useState(false);
  // const [retailerState, setRetailerState] = useState({});
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");
  const [editFlag, setEditFlag] = useState("");
  const { masterData, setMasterData } = useContext(Mastercontext);

  useEffect(() => {
    if (masterData.accessToken) {
      serviceFun();
    }
  }, [masterData.accessToken]);

  const serviceFun = async (checked) => {
    if (checked) {
      await supplierService
        .getUnmapedBrands(masterData.accessToken)
        .then((response) => searchFun(response.data.data))
        .catch((error) => console.log(error));
    } else {
      await supplierService
        .getSuppliers(masterData.accessToken)
        .then((response) => searchFun(response.data.data, "list"))
        .catch((error) => console.log(error));
    }
    setSelectedValue({});
  };

  /* dataTable Start */

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
      field: "",
      header: "",
      sortable: false,
      headerStyle: { width: "50px" },
    },
    {
      field: "supplier",
      header: header("Supplier"),
      sortable: true,
      headerStyle: { width: "180px" },
    },
    {
      field: "brand",
      header: header("Brand"),
      sortable: true,
      headerStyle: { width: "180px" },
    },

    {
      field: "last_updated",
      header: header("Last Updated"),
      sortable: true,
      headerStyle: { width: "180px" },
    },

    {
      field: "updated_by",
      header: header("Updated By"),
      sortable: true,
      headerStyle: { width: "180px" },
    },
  ];

  const rowData = () => {
    let data = supplier.map((item, i, a) => (a[i] = { id: i + 1, ...item }));
    return data;
  };

  const handleChangeRadio = (props) => {
    setSelectedValue(props);
  };

  const actionButton = (params) => {
    return (
      <div>
        <Radio
          checked={selectedValue.id === params.id}
          onChange={() => handleChangeRadio(params)}
          value="d"
          color="primary"
          name="radio-button-demo"
          inputProps={{ "aria-label": selectedValue.id }}
        />
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

  /* dataTable end */

  const searchFun = async (data, list) => {
    setSupplier(data);

    const searchObj = {
      supplier: [],
      brand: [],
    };

    let unicSupplier = Array.from(new Set(data.map((a) => a.supplier))).map(
      (id) => {
        return data.find((a) => a.supplier === id);
      }
    );
    searchObj.supplier = unicSupplier.filter((item, i) => {
      if (
        item.supplier &&
        !(
          item.supplier === "-" ||
          item.supplier === null ||
          item.supplier === undefined
        )
      ) {
        return item;
      }
    });
    searchObj.supplier.sort((a, b) => {
      return a.supplier.localeCompare(b.supplier);
    });

    if (list) {
      setMasterData({ ...masterData, supplierList: searchObj });
    }

    searchObj.brand = data.filter((item, i) => {
      if (
        item.brand &&
        !(item.brand === "-" || item.brand === null || item.brand === undefined)
      ) {
        return item;
      }
    });
    searchObj.brand.sort((a, b) => {
      return a.brand.localeCompare(b.brand);
    });
    await setSearchObj(searchObj);
  };

  const onSubmit = async (data) => {
    setSelectedValue({});
    let searchValues = {};
    if (supplierName && supplierName.supplier) {
      searchValues.supplierName = supplierName;
    } else if (brandName && brandName.brand) {
      searchValues.brandName = brandName;
    }
    setSupplierSearchObj(searchValues);
    filterData();
  };

  const filterData = () => {
    const filterModel = {};
    let obj = {
      ...supplierSearchObj.supplierName,
      ...supplierSearchObj.brandName,
    };
    if (supplierSearchObj && supplierSearchObj.supplierName) {
      filterModel.supplier = { value: obj.supplier };
    } else if (supplierSearchObj && supplierSearchObj.brandName) {
      filterModel.brand = { value: obj.brand };
    }
    return filterModel;
  };

  /* open model popup function */
  const descriptionElementRef = React.useRef(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const handleClickOpen = (scrollType, flag) => () => {
    setOpen(true);
    setScroll(scrollType);
    setEditFlag(flag);
  };

  const handleClose = () => {
    setOpen(false);
  };
  /* end model popup function */

  /* show unmapped brands onchnage function */
  const onChange = (e, val) => {
    let checked = e.target.checked;
    setUNmappedBrands(checked);
    serviceFun(checked);
  };
  /* end unmapped brands onchnage function */

  if (isLoading || !isAuthenticated) {
    return null;
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} style={{ marginBottom: "10px" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item sm={"auto"}>
              <CheckBox
                label={"Show unmapped brands"}
                name="show_unmapped_brands"
                control={control}
                checked={unmapped_brands}
                onChange={(e) => onChange(e, "tax")}
              />
            </Grid>
            <Grid item sm={3}>
              <Autocomplete
                name="Supplier"
                value={supplierName}
                onChange={(event, newValue) => {
                  setSupplierName(newValue);
                }}
                options={
                  searchObj && searchObj.supplier ? searchObj.supplier : []
                }
                size="small"
                getOptionLabel={(option) => option.supplier}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Supplier"
                    placeholder="Supplier"
                    className={classes.textField}
                    margin="dense"
                    variant="outlined"
                  />
                )}
                renderOption={(option, { inputValue }) => {
                  const matches = match(option.supplier, inputValue);
                  const parts = parse(option.supplier, matches);

                  return (
                    <div>
                      {parts.map((part, index) => (
                        <span
                          key={index}
                          style={{ fontWeight: part.highlight ? 700 : 400 }}
                        >
                          {part.text}
                        </span>
                      ))}
                    </div>
                  );
                }}
              />
            </Grid>

            <Grid item sm={3}>
              <Autocomplete
                name="brand"
                value={brandName}
                onChange={(event, newValue) => {
                  setBrandName(newValue);
                }}
                options={searchObj && searchObj.brand ? searchObj.brand : []}
                size="small"
                getOptionLabel={(option) => option.brand}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Brand"
                    placeholder="Brand"
                    className={classes.textField}
                    margin="dense"
                    variant="outlined"
                  />
                )}
                renderOption={(option, { inputValue }) => {
                  const matches = match(option.brand, inputValue);
                  const parts = parse(option.brand, matches);

                  return (
                    <div>
                      {parts.map((part, index) => (
                        <span
                          key={index}
                          style={{ fontWeight: part.highlight ? 700 : 400 }}
                        >
                          {part.text}
                        </span>
                      ))}
                    </div>
                  );
                }}
              />
            </Grid>

            <Grid item sm={2}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ marginTop: "9px", marginRight: "10px" }}
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      <Paper className={classes.paper}>
        {supplier.length > 0 ? (
          <DataTable
            columns={columns}
            rows={rowData()}
            filterModel={filterData()}
            modifyColums={(rowData, col) => modifyColums(rowData, col)}
          />
        ) : (
          ""
        )}
      </Paper>

      <Paper className={classes.paper} style={{ marginTop: "10px" }}>
        <Grid container spacing={2}>
          <Grid item sm={8}></Grid>
          <Grid item sm={4}>
            <Button
              className={classes.btn}
              variant="contained"
              size="small"
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleClickOpen("paper", "new")}
            >
              Add new Brand
            </Button>
            <Button
              className={classes.btn}
              variant="contained"
              size="small"
              color="primary"
              startIcon={<EditIcon />}
              disabled={!(selectedValue && selectedValue.id) ? true : false}
              onClick={handleClickOpen("paper", "Edit")}
            >
              Edit
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {editFlag === "Edit" ? (
        <AddSupplier
          open={open}
          scroll={scroll}
          descriptionElementRef={descriptionElementRef}
          handleClose={handleClose}
          editFlag={editFlag}
          selectedData={selectedValue}
          suppliersList={
            // searchObj &&  searchObj.supplier ?  searchObj.supplier :[]
            masterData && masterData.supplierList
              ? masterData.supplierList.supplier
              : searchObj.supplier
          }
          unmappedBrands={unmapped_brands}
          serviceFun={serviceFun}
          setUNmappedBrands={setUNmappedBrands}
        />
      ) : editFlag === "new" ? (
        <AddSupplier
          open={open}
          scroll={scroll}
          descriptionElementRef={descriptionElementRef}
          handleClose={handleClose}
          suppliersList={
            masterData && masterData.supplierList
              ? masterData.supplierList.supplier
              : searchObj.supplier
          }
          serviceFun={serviceFun}
          setUNmappedBrands={setUNmappedBrands}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Supplier;
