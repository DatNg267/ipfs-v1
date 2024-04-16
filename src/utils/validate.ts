import valid from 'card-validator'
import { isEmpty } from 'lodash'
import * as yup from 'yup'
import { FormErrorMessage, generateFieldIsRequired } from './error'

export const appValidation = {
  email: yup
    .string()
    .required(generateFieldIsRequired('Email'))
    .email(FormErrorMessage.EMAIL),
  newPassword: (fieldName: string) =>
    yup
      .string()
      .required(generateFieldIsRequired('New password'))
      .min(8, FormErrorMessage.PASSWORD)
      .max(32, FormErrorMessage.PASSWORD)
      .test(
        'new-password',
        FormErrorMessage.NEW_PASSWORD_DIFFERENT_CURRENT_PASSWORD,
        (val, ctx) => {
          if (
            ctx.parent[fieldName] === ctx.parent.newPassword &&
            !isEmpty(ctx.parent[fieldName]) &&
            !isEmpty(ctx.parent.newPassword)
          ) {
            return false
          }
          return true
        }
      ),
  password: yup
    .string()
    .required(generateFieldIsRequired('Password'))
    .min(8, FormErrorMessage.PASSWORD)
    .max(32, FormErrorMessage.PASSWORD),

  confirmPassword: (fieldName: string, message: string) =>
    yup
      .string()
      .required('Confirm password is required')
      .min(8, FormErrorMessage.PASSWORD)
      .max(32, FormErrorMessage.PASSWORD)
      .oneOf([yup.ref(fieldName)], message),

  lastName: yup
    .string()
    .min(1, generateFieldIsRequired('Last name'))
    .max(50, 'Last name max length is 50 characters'),
  firstName: yup
    .string()
    .min(1, generateFieldIsRequired('First name'))
    .max(50, 'First name max length is 50 characters'),
  code: yup
    .string()
    .min(1, generateFieldIsRequired('Code'))
    .matches(/^(?!.*[-+e])\d{6}$/, FormErrorMessage.CODE),

  creditCardExpirationDate: yup
    .string()
    .typeError('Not a valid expiration date. Example: MM/YY')
    .max(5, 'Not a valid expiration date. Example: MM/YY')
    .matches(
      /([0-9]{2})\/([0-9]{2})/,
      'Not a valid expiration date. Example: MM/YY'
    )
    .required('Expiration date is required'),
  creditCard: yup
    .string()
    .test(
      'test-number',
      'Credit Card number is invalid',
      (value) => valid.number(value).isValid
    ),
  cvc: yup
    .string()
    .min(3)
    .max(4)
    .required()
    .test(
      'test-cvc',
      'CVC number is invalid',
      (value) => valid.cvv(value).isValid
    ),
}
