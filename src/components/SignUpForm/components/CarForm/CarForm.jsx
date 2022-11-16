import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';

import { OPTIONS_VALIDATE } from '../../../helpers/OPTIONS_VALIDATE';
import { INPUT_TYPES } from '../../../../shared/components/form-elements/FormInput/form-input.constants';
import FormInput from '../../../../shared/components/form-elements/FormInput/FormInput';

import classes from './car-form.module.css';

function CarForm({ control, errors }) {
  const { t } = useTranslation();
  return (
    <div className={classes.car__block}>
      <p className={classes.car__title}>{t('car')}</p>
      <FormInput
        name="car.make"
        placeholder={t('input_name.make')}
        type={INPUT_TYPES.TEXT}
        control={control}
        className={classes.form__input}
        error={errors?.make}
        rules={OPTIONS_VALIDATE.MAKE}
      />
      <FormInput
        name="car.model"
        placeholder={t('input_name.model')}
        type={INPUT_TYPES.TEXT}
        control={control}
        className={classes.form__input}
        error={errors?.model}
        rules={OPTIONS_VALIDATE.MODEL}
      />
      <FormInput
        name="car.year"
        placeholder={t('input_name.year')}
        type={INPUT_TYPES.TEXT}
        control={control}
        className={classes.form__input}
        error={errors?.year}
        rules={OPTIONS_VALIDATE.YEAR}
      />
      <FormInput
        name="car.color"
        placeholder={t('input_name.color')}
        type={INPUT_TYPES.TEXT}
        control={control}
        className={classes.form__input}
        error={errors?.color}
        rules={OPTIONS_VALIDATE.COLOR}
      />
    </div>
  );
}

CarForm.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  control: PropTypes.objectOf(PropTypes.func).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.object.isRequired
};

export default CarForm;
