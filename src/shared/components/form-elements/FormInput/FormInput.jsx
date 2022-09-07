import React, { useState } from 'react';

import { Controller } from 'react-hook-form';

import {
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton
} from '@mui/material';

import PropTypes from 'prop-types';

import classes from './form-input.module.css';

import { computedInputType, INPUT_TYPES } from './form-input.constants';

import VisibilityOff from './components/VisibilityOff/VisibilityOff';
import Visibility from './components/Visibility/Visibility';

function FormInput({ name, rules, type, className, error, placeholder, control }) {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Controller
      render={({ field, fieldState: { isTouched } }) => (
        <div className={`${classes.container} ${className}`}>
          <FormControl variant="outlined" color="form">
            <InputLabel htmlFor={name} error={isTouched ? !!error : ''}>
              {placeholder}
            </InputLabel>
            <OutlinedInput
              id={name}
              error={isTouched ? !!error : ''}
              value=""
              type={computedInputType(type, showPassword)}
              {...field}
              placeholder={placeholder}
              endAdornment={
                type === INPUT_TYPES.PASSWORD && (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      edge="end"
                      onClick={handleShowPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }
              label={placeholder}
            />
            <FormHelperText error={!!error}>{isTouched ? error?.message : ''}</FormHelperText>
          </FormControl>
        </div>
      )}
      name={name}
      control={control}
      rules={rules}
    />
  );
}

FormInput.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(Object.values(INPUT_TYPES)).isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  error: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  control: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  rules: PropTypes.object
};

FormInput.defaultProps = {
  control: {},
  rules: {},
  error: null,
  placeholder: '',
  className: ''
};

export default FormInput;
