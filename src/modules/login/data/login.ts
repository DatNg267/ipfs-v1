import { appValidation } from '@/utils/validate'
import * as yup from 'yup'

export const formLoginSchema = yup.object({
  email: appValidation.email,
  password: yup.string(),
})
