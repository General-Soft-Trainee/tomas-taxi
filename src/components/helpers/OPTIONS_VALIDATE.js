import '../../i18n/i18n';
import { t } from 'i18next';

export const OPTIONS_VALIDATE = {
  EMAIL: {
    required: t('input_errors.email.required'),
    pattern: {
      value:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: t('input_errors.email.message')
    }
  },
  PASSWORD: {
    required: t('input_errors.password.required'),
    minLength: {
      value: 6,
      message: t('input_errors.password.messageMin')
    },
    maxLength: {
      value: 20,
      message: t('input_errors.password.messageMax')
    }
  },
  FIRST_NAME: {
    required: t('input_errors.first_name.required')
  },
  LAST_NAME: {
    required: t('input_errors.last_name.required')
  },
  ROLE: {
    required: t('input_errors.role.required')
  },
  MAKE: {
    required: t('input_errors.make.required')
  },
  MODEL: {
    required: t('input_errors.model.required')
  },
  YEAR: {
    required: t('input_errors.year.required'),
    minLength: {
      value: 4,
      message: t('input_errors.year.messageMin')
    },
    maxLength: {
      value: 4,
      message: t('input_errors.year.messageMax')
    }
  },
  COLOR: {
    required: t('input_errors.color.required')
  },
  SOURCE: {
    required: t('input_errors.source.required')
  },
  DESTINATION: {
    required: t('input_errors.destination.required')
  },
  PRICE: {
    required: t('input_errors.price.required')
  },
  RATING: {
    required: true
  }
};
