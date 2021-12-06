import React from "react";
// import { TextField } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { PropTypes } from "prop-types";
import { Controller } from "react-hook-form";

const CheckBox = ({
  name,
  id,
  className,
  defaultValue,
  control,
  rules,
  label,
  disabled,
  checked,
  onChange,
}) => {
  return (
    <Controller
      render={({ fieldState: { error } }) => (
        <FormControlLabel
          control={
            <Checkbox
              checked={checked}
              onChange={(e) => onChange(e)}
              color="primary"
              disabled={disabled}
             
            />
          }
          label={label}
          error={!!error}
          helperText={error ? error.message : null}
          style={{marginLeft:"9px",marginTop:"7px"}}
        />
      )}
      id={id}
      name={name}
      className={className}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
    />
  );
};

CheckBox.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.string,
};

CheckBox.defaultValue = {
  checked: false,
};

export default CheckBox;
