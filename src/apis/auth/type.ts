import { Balance, User } from '@/types/user'

export type RegisterResponse = {}
export type RegisterRequest = {
  email: string
  password: string
  confirmPassword: string
  firstName: string
  lastName: string
}
export type VerifyEmailRequest = {
  code: string
}
export type VerifyEmailReponse = {
  access_token: string
  refresh_token: string
  status: string
}
export type LoginResponse = {
  access_token: string
  refresh_token: string
  status: string
}
export type LoginRequest = {
  email: string
  password: string
}
export type RefreshTokenResponse = {
  access_token: string
}
export type RefreshTokenRequest = {
  refresh_token: string
}

export type ForgotPasswordResponse = {
  message: string
  status: string
}
export type ForgotPasswordRequest = {
  email: string
}

export type ResetPasswordResponse = {
  message: string
  status: string
}
export type ResetPasswordRequest = {
  newPassword: string
  confirmPassword: string
  code: string
  email: string
}

export type VerifyCodeRequest = {
  code: string
}
export type VerifyCodeReponse = {}
export type ResendEmailRequest = {
  email: string
}
export type ResendEmailResponse = {}

export type ChangePasswordRequest = {
  email: string
  password: string
  newPassword: string
  confirmNewPassword: string
}

export type EditProfileRequest = {
  firstName: string
  lastName: string
}

export type EditProfileResponse = {
  status: string
  data: User
}
export type GetBalanceResponse = {
  status: string
  data: Balance
}
