import { createSlice, nanoid } from '@reduxjs/toolkit'

export enum ApplicationModal {
  CONNECT_WALLET,
  CONFIRM,
  REQUEST_LOGIN,
  EXPIRED_TOKEN,
  CREATE_API_KEY,
  CREATE_API_KEY_INFO,
  REVOKE_API_KEY,
  CREATE_IPFS_FILE,
  PIN_BY_CID,
  EDIT_IPFS_FILE,
  DELETE_IPFS_FILE,

  PIN_NFT,
  UNPIN_NFT,
  PIN_NFT_BY_CID,

  TOP_UP,
  PAYMENT_METHOD,
  PAY_WITH_AIOZ,
  CREDIT_CARD,
  LOG_OUT,

  NOT_ENOUGH_BALANCE,
  LOW_BALANCE,

  SUBCRIBE_DEDICATED_GATEWAYS,
  UNSUBCRIBE_DEDICATED_GATEWAYS,

  REVIEW_FOLDER,
  REVIEW_FILE,

  ZIPPING_FOLDER,
}
export interface ModalState {
  openModal: ApplicationModal | null
  props: any
}
const initialState: ModalState = {
  openModal: null,
  props: null,
}
const ModalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    putProps(state, action) {
      state.props = action.payload
    },
    setOpenModal(state, action) {
      state.openModal = action.payload
    },
    setCloseModal(state) {
      state.openModal = null
      state.props = null
    },
  },
})

export const { putProps, setOpenModal, setCloseModal } = ModalSlice.actions
export const appModalReducer = ModalSlice.reducer
