import {
  ChangePasswordRequest,
  EditProfileRequest,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  GetBalanceResponse,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  ResendEmailRequest,
  ResendEmailResponse,
  ResetPasswordRequest,
  VerifyEmailRequest,
} from '@/apis/auth/type'
import { axiosAuthorized } from '../_axiosAuth'
import { axiosClient } from '../_axiosClient'

export const authApis = {
  // [GET]
  resendMail: ({ email }: ResendEmailRequest): Promise<ResendEmailResponse> => {
    return axiosClient.get(`/auth/resend/${email}`).then((response) => {
      return response.data
    })
  },
  getInfoUser: () => {
    return axiosAuthorized.get('/users/me').then((response) => {
      return response.data
    })
  },
  getBalance: (): Promise<GetBalanceResponse> => {
    return axiosAuthorized.get('/users/balance').then((response) => {
      return response.data
    })
  },
  logout: () => {
    return axiosClient.get('/auth/logout').then((response) => {
      return response.data
    })
  },
  refreshToken: (refreshToken: string) => {
    return axiosClient
      .get('/auth/refresh', {
        headers: {
          refresh_token: refreshToken,
        },
      })
      .then((response) => {
        return response.data
      })
  },
  verifyEmail: ({ code }: VerifyEmailRequest) => {
    return axiosClient.get(`/auth/verifyemail/${code}`, {}).then((response) => {
      return response.data
    })
  },

  // [POST]
  login: ({ email, password }: LoginRequest): Promise<LoginResponse> => {
    return axiosClient
      .post('/auth/login', {
        email,
        password,
      })
      .then((response) => response.data)
  },
  register: ({
    email,
    firstName,
    lastName,
    password,
    confirmPassword,
  }: RegisterRequest) => {
    return axiosClient
      .post('/auth/register', {
        email,
        first_name: firstName,
        last_name: lastName,
        password,
        password_confirm: confirmPassword,
      })
      .then((response) => response.data)
  },
  forgotPassword: ({
    email,
  }: ForgotPasswordRequest): Promise<ForgotPasswordResponse> => {
    return axiosClient
      .get(`/auth/forgotpassword/${email}`)
      .then((response) => response.data)
  },

  // [PATCH]
  resetPassword: ({
    code,
    newPassword,
    confirmPassword,
    email,
  }: ResetPasswordRequest) => {
    return axiosClient
      .post('/auth/resetpassword/', {
        password: newPassword,
        password_confirm: confirmPassword,
        code,
        email,
      })
      .then((response) => response.data)
  },

  changePassword: ({
    confirmNewPassword,
    email,
    newPassword,
    password,
  }: ChangePasswordRequest) => {
    return axiosClient
      .post('/auth/changePassword/', {
        confirm_new_password: confirmNewPassword,
        email,
        new_password: newPassword,
        password,
      })
      .then((response) => response.data)
  },
  // [PUT]
  editProfile: ({ firstName, lastName }: EditProfileRequest) => {
    return axiosAuthorized
      .put('/users/editProfile/', {
        first_name: firstName,
        last_name: lastName,
      })
      .then((response) => response.data)
  },
  // [DELETE]
}
