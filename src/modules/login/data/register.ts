import { FormErrorMessage } from '@/utils/error'
import { appValidation } from '@/utils/validate'
import * as yup from 'yup'

export const formRegisterSchema = yup.object().shape({
  email: appValidation.email,
  lastName: appValidation.lastName,
  firstName: appValidation.firstName,
  password: appValidation.password,
  confirmPassword: appValidation.confirmPassword(
    'password',
    FormErrorMessage.CONFIRM_PASSWORD_MUST_BE_SAME_THE_PASSWORD
  ),
})

export const registerFormDefaultValues = {
  email: '',
  password: '',
  lastName: '',
  firstName: '',
  confirmPassword: '',
  custome: false,
}
