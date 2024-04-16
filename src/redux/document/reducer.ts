import { DocumentContent, DocumentFiles, Navs } from '@/modules/document/types'
import { PageRefsMapping } from '@/modules/document/types/page-refs'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface ModalState {
  navbar: Navs | null
  content: DocumentContent | null
  files: DocumentFiles | null
  pageRefsMapping: PageRefsMapping
}
const initialState: ModalState = {
  navbar: null,
  content: null,
  files: null,
  pageRefsMapping: {},
}
const documentSlice = createSlice({
  name: 'backdrop',
  initialState,
  reducers: {
    updateNavbar(state, action: PayloadAction<Navs | null>) {
      state.navbar = action.payload
    },
    updateDocumentData(state, action: PayloadAction<DocumentContent | null>) {
      state.content = action.payload
    },
    updateDocumentFiles(state, action: PayloadAction<DocumentFiles | null>) {
      state.files = action.payload
    },
    updatePageRefsMapping(state, action: PayloadAction<PageRefsMapping>) {
      state.pageRefsMapping = action.payload
    },
  },
})

export const DocumentActions = documentSlice.actions
export const DocumentReducer = documentSlice.reducer
