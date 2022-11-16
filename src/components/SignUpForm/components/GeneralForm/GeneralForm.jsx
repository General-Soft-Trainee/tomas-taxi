import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';

import { INPUT_TYPES } from '../../../../shared/components/form-elements/FormInput/form-input.constants';
import { OPTIONS_VALIDATE } from '../../../helpers/OPTIONS_VALIDATE';
import FormInput from '../../../../shared/components/form-elements/FormInput/FormInput';
import FormSelect from '../../../../shared/components/form-elements/FormSelect/FormSelect';

import { USER_SELECT } from '../../sign-up-form.constants';

import classes from './general-form.module.css';

function GeneralForm({ control, errors, watch }) {
  const { t } = useTranslation();
  return (
    <div>
      <FormInput
        name="email"
        placeholder={t('input_name.email')}
        type={INPUT_TYPES.EMAIL}
        control={control}
        className={classes.form__input}
        error={errors?.email}
        rules={OPTIONS_VALIDATE.EMAIL}
      />
      <FormInput
        name="password"
        placeholder={t('input_name.password')}
        type={INPUT_TYPES.PASSWORD}
        control={control}
        className={classes.form__input}
        error={errors?.password}
        rules={OPTIONS_VALIDATE.PASSWORD}
      />
      <FormInput
        name="confirmPassword"
        placeholder={t('input_name.confirm_password')}
        type={INPUT_TYPES.PASSWORD}
        control={control}
        className={classes.form__input}
        error={errors?.confirmPassword}
        rules={{
          required: t('input_errors.confirm_password.required'),
          validate: (value) => {
            if (watch('password') !== value) {
              return t('input_errors.confirm_password.message');
            }
            // eslint-disable-next-line prettier/prettier
            return () => { };
          }
        }}
      />
      <FormInput
        name="firstName"
        placeholder={t('input_name.first_name')}
        type={INPUT_TYPES.TEXT}
        control={control}
        className={classes.form__input}
        error={errors?.firstName}
        rules={OPTIONS_VALIDATE.FIRST_NAME}
      />
      <FormInput
        name="lastName"
        placeholder={t('input_name.last_name')}
        type={INPUT_TYPES.TEXT}
        control={control}
        className={classes.form__input}
        error={errors?.lastName}
        rules={OPTIONS_VALIDATE.LAST_NAME}
      />
      <FormSelect
        name="role"
        label={t('input_name.role')}
        items={USER_SELECT}
        className={classes.form__select}
        error={errors?.role}
        control={control}
        rules={OPTIONS_VALIDATE.ROLE}
      />
    </div>
  );
}

GeneralForm.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  control: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.object.isRequired,
  watch: PropTypes.func.isRequired
};

export default GeneralForm;
