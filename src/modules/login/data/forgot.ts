import { appValidation } from '@/utils/validate'
import * as yup from 'yup'

export const formForgotSchema = yup.object({
  email: appValidation.email,
})
