import { authApis } from '@/apis/auth'
import { ChangePasswordRequest, EditProfileRequest } from '@/apis/auth/type'
import { useWrapperFunctionTokenExpired } from '@/services'
import { AppErrorMessage } from '@/utils/error'
export const useChangePassword = (): (({
  newPassword,
  confirmNewPassword,
  password,
  email,
}: ChangePasswordRequest) => Promise<any>) => {
  const func = ({
    newPassword,
    confirmNewPassword,
    password,
    email,
  }: ChangePasswordRequest) => {
    if (
      !newPassword ||
      !confirmNewPassword ||
      !password ||
      !email ||
      newPassword !== confirmNewPassword
    ) {
      throw new Error(AppErrorMessage.INVALID_INPUT_VALUES)
    }
    return authApis.changePassword({
      newPassword,
      confirmNewPassword,
      password,
      email,
    })
  }
  return useWrapperFunctionTokenExpired(func)
}

export const useEditProfile = (): (({
  firstName,
  lastName,
}: EditProfileRequest) => Promise<any>) => {
  const func = ({ firstName, lastName }: EditProfileRequest) => {
    if (!firstName || !lastName) {
      throw new Error(AppErrorMessage.INVALID_INPUT_VALUES)
    }
    return authApis.editProfile({
      firstName,
      lastName,
    })
  }
  return useWrapperFunctionTokenExpired(func)
}
