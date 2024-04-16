import { FormErrorMessage, generateFieldIsRequired } from '@/utils/error'
import { appValidation } from '@/utils/validate'
import { isEmpty } from 'lodash'
import * as yup from 'yup'

export const changePasswordDefaultValues = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
}
export const changePasswordFormSchema = yup.object().shape({
  currentPassword: appValidation.password,
  newPassword: yup
    .string()
    .required(generateFieldIsRequired('New password'))
    .min(8, FormErrorMessage.PASSWORD)
    .max(32, FormErrorMessage.PASSWORD)
    .test(
      'new-password',
      FormErrorMessage.NEW_PASSWORD_DIFFERENT_CURRENT_PASSWORD,
      (val, ctx) => {
        if (
          ctx.parent['currentPassword'] === ctx.parent.newPassword &&
          !isEmpty(ctx.parent['currentPassword']) &&
          !isEmpty(ctx.parent.newPassword)
        ) {
          return false
        }
        return true
      }
    ),
  confirmPassword: yup
    .string()
    .required('Confirm new password is required')
    .min(8, FormErrorMessage.PASSWORD)
    .max(32, FormErrorMessage.PASSWORD)
    .oneOf(
      [yup.ref('newPassword')],
      FormErrorMessage.CONFIRM_PASSWORD_MUST_BE_SAME_THE_NEW_PASSWORD
    ),
})

export const changeInfoFormSchema = yup.object().shape({
  email: appValidation.email,
  first_name: appValidation.firstName,
  last_name: appValidation.lastName,
})

export const changeInfoFormDefaultValues = {
  email: '',
  first_name: '',
  last_name: '',
}
