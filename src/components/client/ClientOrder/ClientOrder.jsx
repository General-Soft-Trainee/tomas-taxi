import React, { useEffect, useState } from 'react';

import { INPUT_TYPES } from '../../../shared/components/form-elements/FormInput/form-input.constants';

import FormInput from '../../../shared/components/form-elements/FormInput/FormInput';
import Button from '../../../shared/components/Button/Button';

import {
  BUTTON_SIZES,
  BUTTON_COLORS,
  BUTTON_VARIANTS,
  BUTTON_TYPES
} from '../../../shared/components/Button/button.constants';

import { generateValidationError } from '../../helpers/generateValidationError';

import { useOrder } from '../../../api/hooks/useOrder';

import classes from './client-order.module.css';
import { initialErrors, initialFormState } from './client-order.constants';

function ClientOrder() {
  const [isFormValid, setIsFormValid] = useState(false);
  const [formState, setFormState] = useState(initialFormState);
  const { source, destination } = formState;
  const [errors, setErrors] = useState(initialErrors);
  const { createOrder } = useOrder();

  useEffect(() => {
    setIsFormValid(errors.source.valid && errors.destination.valid);
  }, [errors.destination.valid, errors.source.valid]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleInputBlur = (e) => {
    const { name, value } = e.target;
    setErrors(generateValidationError(name, value, errors));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createOrder({ source, destination });
  };

  return (
    <div className={classes.container}>
      <div className={classes.block__text}>
        <p className={classes.text}>
          Please input Source and Destination for your order. And we will find a car for you in a
          few seconds
        </p>
        <div className={classes.line} />
      </div>
      <form className={classes.form__wrapper} onSubmit={handleSubmit}>
        <div className={classes.form__container}>
          <FormInput
            id="source"
            type={INPUT_TYPES.TEXT}
            label="Source"
            placeholder="Source"
            name="source"
            value={source}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            errorMessage={errors.source.errorMessage}
          />
          <FormInput
            id="destination"
            type={INPUT_TYPES.TEXT}
            label="Destination"
            placeholder="Destination"
            name="destination"
            className={classes.input}
            value={destination}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            errorMessage={errors.destination.errorMessage}
          />
        </div>
        <Button
          size={BUTTON_SIZES.BIG}
          color={BUTTON_COLORS.PRIMARY}
          variant={BUTTON_VARIANTS.CONTAINED}
          disabled={!isFormValid}
          type={BUTTON_TYPES.SUBMIT}
        >
          Order
        </Button>
      </form>
      <div className={classes.decoration__container}>
        <p className={`${classes.decoration__text} ${classes.decoration__text_top}`}>Destination</p>
        <img src="/img/navigate.png" alt="Navigation" />
        <p className={`${classes.decoration__text} ${classes.decoration__text_bottom}`}>Source</p>
      </div>
    </div>
  );
}

export default ClientOrder;
