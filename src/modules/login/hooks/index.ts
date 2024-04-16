import { authApis } from '@/apis/auth'
import {
  ChangePasswordRequest,
  EditProfileRequest,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  ResendEmailRequest,
  ResendEmailResponse,
  ResetPasswordRequest,
  VerifyEmailReponse,
  VerifyEmailRequest,
} from '@/apis/auth/type'
import { useUpdateStateLogin } from '@/redux/auth/hooks'
import { AppErrorMessage, getError } from '@/utils/error'
import { useCallback } from 'react'

export const register = async ({
  email,
  password,
  confirmPassword,
  firstName,
  lastName,
}: RegisterRequest): Promise<RegisterResponse> => {
  try {
    if (
      !email ||
      !password ||
      !confirmPassword ||
      !firstName ||
      !lastName ||
      password !== confirmPassword
    ) {
      throw new Error(AppErrorMessage.INVALID_INPUT_VALUES)
    }
    const registerResponse = await authApis.register({
      email,
      password,
      confirmPassword,
      firstName,
      lastName,
    })
    return registerResponse.data
  } catch (err) {
    throw new Error(getError(err).error.message)
  }
}

export const verifyEmail = async ({
  code,
}: VerifyEmailRequest): Promise<VerifyEmailReponse> => {
  try {
    if (!code) {
      throw new Error(AppErrorMessage.INVALID_INPUT_VALUES)
    }
    const verifyEmailResponse = await authApis.verifyEmail({
      code,
    })
    return verifyEmailResponse
  } catch (err) {
    throw new Error(getError(err).error.message)
  }
}

export const useLogin = (): (({
  email,
  password,
}: LoginRequest) => Promise<LoginResponse>) => {
  const handleSetStateLogin = useUpdateStateLogin()
  return useCallback(
    async ({ email, password }: LoginRequest) => {
      try {
        if (!email || !password) {
          throw new Error(AppErrorMessage.INVALID_INPUT_VALUES)
        }
        const loginResponse = await authApis.login({
          email,
          password,
        })
        handleSetStateLogin(
          loginResponse.access_token,
          loginResponse.refresh_token
        )
        return loginResponse
      } catch (err) {
        throw new Error(getError(err).error.message)
      }
    },
    [handleSetStateLogin]
  )
}

export const resetPassword = async ({
  newPassword,
  confirmPassword,
  code,
  email,
}: ResetPasswordRequest): Promise<RegisterResponse> => {
  try {
    if (
      !email ||
      !code ||
      !newPassword ||
      !confirmPassword ||
      newPassword !== confirmPassword
    ) {
      throw new Error(AppErrorMessage.INVALID_INPUT_VALUES)
    }

    const registerResponse = await authApis.resetPassword({
      newPassword,
      confirmPassword,
      code,
      email,
    })
    return registerResponse.data
  } catch (err) {
    throw new Error(getError(err).error.message)
  }
}

// use forgot password
export const sendEmail = async ({
  email,
}: ForgotPasswordRequest): Promise<ForgotPasswordResponse> => {
  try {
    if (!email) {
      throw new Error(AppErrorMessage.INVALID_INPUT_VALUES)
    }

    const registerResponse = await authApis.forgotPassword({
      email,
    })
    return registerResponse
  } catch (err) {
    throw new Error(getError(err).error.message)
  }
}

export const resendEmail = async ({
  email,
}: ResendEmailRequest): Promise<ResendEmailResponse> => {
  try {
    if (!email) {
      throw new Error(AppErrorMessage.INVALID_INPUT_VALUES)
    }
    const registerResponse = await authApis.resendMail({
      email,
    })
    return registerResponse
  } catch (err) {
    throw new Error(getError(err).error.message)
  }
}
