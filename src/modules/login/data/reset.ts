import { FormErrorMessage } from '@/utils/error'
import { appValidation } from '@/utils/validate'
import * as yup from 'yup'

export const formResetPasswordSchema = yup.object({
  code: appValidation.code,
  newPassword: appValidation.password,
  confirmPassword: appValidation.confirmPassword(
    'newPassword',
    FormErrorMessage.CONFIRM_PASSWORD_MUST_BE_SAME_THE_NEW_PASSWORD
  ),
})

export const resetFormDefaultValues = {
  confirmPassword: '',
  newPassword: '',
  code: '',
}
