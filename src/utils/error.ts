import axios, { AxiosError, isAxiosError } from 'axios'
export enum AppSuccessMessage {
  CHANGE_PASSWORD_SUCCESS = 'Change password successful!',
}
export enum FormErrorMessage {
  PASSWORD = 'Password must be between 8 and 32 characters in length.',
  EMAIL = 'Invalid email',
  NEW_PASSWORD_DIFFERENT_CURRENT_PASSWORD = 'New password must be different from current password',
  PASSWORD_NOT_MATCH = 'Passwords do not match',
  NEW_PASSWORD_NOT_MATCH = 'New passwords do not match',
  CONFIRM_PASSWORD_MUST_BE_SAME_THE_NEW_PASSWORD = 'Confirm password must be same as the new password',
  CONFIRM_PASSWORD_MUST_BE_SAME_THE_PASSWORD = 'Confirm password must be same as the password',
  ACCEPT_TERMS = 'You must accept the terms and conditions',
  CODE = 'The code should be exactly 6 digits long.',
  METADATA_IS_REQUIRED = 'Metadata is required.',
  METADATA_FORMAT_IS_NOT_VALID = 'The metadata format is not valid.',
  CANNOT_INPUT_JSON_ARRAY = 'The metadata format is not valid. Cannot input a JSON array.',

  PLEASE_PROVIDE_NAME_FOR_FOLDER = 'Please provide a name for the folder',
}
export enum ServerErrorMessage {
  CANCEL_PROGRESS = 'canceled',

  USER_NOT_VERIFIED = 'User not verified',
  WRONG_EMAIL_OR_PASSWORD = 'Invalid email or Password',
  ACCOUNT_IS_EXISTS = 'duplicated key not allowed',
  EMAIL_IS_NOT_REGISTERED = 'record not found',

  INVALID_RESET_CODE = 'Invalid reset code',
  INvALID_VERIFICATION_CODE = 'Invalid verification code',

  RESEND_MAIL_TIME_LIMIT = 'resend mail time limit not reached',
  INVALID_CID_TOO_SHORT = 'invalid cid: cid too short',
  INVALID_CID_ENCODING_NOT_SUPPORTED = 'invalid cid: selected encoding not supported',

  CAN_NOT_DELETE_DEFAULT_API_KEY = 'Cannot delete the default API key',

  PIN_HASH_ALREADY_EXISTS = 'Pin with that hash already exists',
  INVALID_TOKEN = 'validate: Token is expired',
  NOT_LOGGED = 'You are not logged in',

  MAXIMUM_API_KEY = 'Maximum number of API keys exceeded. Please delete some keys before creating a new one.',

  SUBCRIBE_GATEWAY_DELAY = 'cannot be deleted because it was created less than 5 minutes ago',

  USER_NOT_ENOUGH_BALANCE = 'User not enough balance',
  FAIL_TO_GET_UPLOADED_FILES = 'Failed to get uploaded files',
  CAN_NOT_CREATE_APIKEY_WITH_DEFAULT_NAME = `Cannot create an API key with the name 'Default'`,

  CANNOT_PIN_EMPTY_FILE = 'Cannot pin empty file',
  EMPTY_BUFFER = 'Empty buffer',
}
export enum UserErrorMessage {
  CANCEL_PROGRESS = 'Canceled',

  AN_ERROR_HAS_OCCURRED = 'The following error occurred while processing',

  FETCHING_DATA_FAILED = 'Fetching data failed',
  ACCOUNT_IS_EXISTS = 'An account with the given email already exists.',
  WRONG_EMAIL_OR_PASSWORD = 'Wrong email or password',
  USER_NOT_VERIFIED = 'User not verified',
  EMAIL_IS_NOT_REGISTERED = 'Incorrect email or password',

  INVALID_RESET_CODE = 'Invalid reset code, please check your email again.',
  INvALID_VERIFICATION_CODE = 'Invalid verification code',

  RESEND_MAIL_TIME_LIMIT = 'Too many resend mail attempts. Please try again later.',
  INVALID_CID_TOO_SHORT = 'Invalid IPFS hash. Please enter a valid CID to pin!',
  INVALID_CID_ENCODING_NOT_SUPPORTED = 'Invalid IPFS hash. Please enter a valid CID to pin!',
  INVALID_CID = 'Invalid cid',

  CAN_NOT_CREATE_APIKEY_WITH_DEFAULT_NAME = `Cannot create an API key with the name 'Default'`,
  API_KEY_IS_EXISTS = 'Api key already exists',
  CAN_NOT_DELETE_DEFAULT_API_KEY = 'Cannot delete the default API key',
  PIN_HASH_ALREADY_EXISTS = 'Pin with that hash already exists',

  MAXIMUM_API_KEY = 'Maximum number of API keys exceeded. Please delete some keys before creating a new one.',
  INVALID_TOKEN = 'Token is expired',
  NOT_LOGGED = 'You are not logged in',
  VALIDATE_TOKEN_FAILED = 'validate: token contains an invalid number of segments',

  SUBCRIBE_GATEWAY_DELAY = 'You can make changes once every 5 minutes.',
  USER_NOT_ENOUGH_BALANCE = 'Your balance is not enough',

  VERIFY_EMAIL_EXPERIED = 'Verify email url invalid, Please check your email again.',
  FAIL_TO_GET_UPLOADED_FILES = 'Invalid cid',

  MANY_REQUEST = 'Too many request!. Please try again later',

  CANNOT_PIN_EMPTY_FILE = 'Cannot pin empty file',
  EMPTY_BUFFER = 'Cannot upload empty file',
}
export enum AppErrorMessage {
  UNKNOWN = 'UNKNOWN',
  // AN_ERROR_HAS_OCCURRED = 'AN_ERROR_HAS_OCCURRED',
  AN_ERROR_HAS_OCCURRED = 'AN_ERROR_HAS_OCCURRED',
  INVALID_INPUT_VALUES = 'INVALID_INPUT_VALUES',
  VALIDATE_DATA_ERROR = 'VALIDATE_DATA_ERROR', // used for validate api
  FETCH_DATA_ERROR = 'FETCH_DATA_ERROR',
  UNAUTHORIZED = 'UNAUTHORIZED',
  INVALID_TOKEN = 'INVALID_TOKEN',
  REFRESH_TOKEN_FAILED = 'REFRESH_TOKEN_FAILED',
}

export type AppError = {
  type: 'axios' | 'error' | 'unknown'
  error: Error
  originError: AxiosError | Error | unknown
}
export const getError = (
  error: any,
  replaceError: string = UserErrorMessage.AN_ERROR_HAS_OCCURRED
): AppError => {
  const unknownError: AppError = {
    type: 'unknown',
    error: new Error(UserErrorMessage.AN_ERROR_HAS_OCCURRED),
    originError: error,
  }
  try {
    if (axios.isCancel(error)) {
      return {
        type: 'axios',
        error: new Error(UserErrorMessage.CANCEL_PROGRESS),
        originError: error,
      }
    } else if (isAxiosError(error)) {
      if (error.response?.status === 429) {
        return {
          type: 'axios',
          error: new Error(UserErrorMessage.MANY_REQUEST),
          originError: error,
        }
      }

      const message = convertServerToClientMessage(error.response?.data.message)
      if (message)
        return {
          type: 'axios',
          error: new Error(message || replaceError),
          originError: error,
        }
      else
        return {
          type: 'axios',
          error: new Error(
            replaceError || UserErrorMessage.AN_ERROR_HAS_OCCURRED
          ),
          originError: error,
        }
    } else if (error instanceof Error) {
      return {
        type: 'error',
        error: error,
        originError: error,
      }
    } else {
      return unknownError
    }
  } catch (error) {
    return unknownError
  }
}
export const convertServerToClientMessage = (errorMessage?: string | null) => {
  if (!errorMessage) return undefined
  const res = Object.keys(ServerErrorMessage).find((el) => {
    return ServerErrorMessage[el] === errorMessage
  })
  if (res) {
    return UserErrorMessage[res]
  }
}
export const generateFieldIsRequired = (fieldName: string) => {
  return `${fieldName} is required`
}
