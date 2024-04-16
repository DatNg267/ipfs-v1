import { configureStore } from '@reduxjs/toolkit'
import { appModalReducer } from './modal/reducer'
import { authReducer } from './auth/reducer'
import { DocumentReducer } from './document/reducer'
import { RouterReducer } from './routes/reducer'
import { backdropReducer } from './backdrop/reducer'
import { TopUpUsageReducer } from './top-up/reducer'
import { appReducer } from './app/reducer'
import { CancelProgressReducer } from './cancel-progress/reducer'
import { modalReviewFolderReducer } from '@/redux/modal-review-folder'
import { downloadReducer } from './download-and-zipping/reducer'
import { modalDownloadProgressReducer } from './modal-download-progress/reducer'
import { modalReviewFileReducer } from './modal-review-file'
import { uploadWrapperAnimateLoadingReducer } from './upload-wrapper/reducer'
const store = configureStore({
  reducer: {
    app: appReducer,
    appModal: appModalReducer,
    auth: authReducer,
    backdrop: backdropReducer,
    router: RouterReducer,
    topUpUsage: TopUpUsageReducer,
    document: DocumentReducer,
    cancelProgress: CancelProgressReducer,

    download: downloadReducer,
    // Component
    modalReviewFolder: modalReviewFolderReducer,
    modalReviewFile: modalReviewFileReducer,
    modalDownloadProgress: modalDownloadProgressReducer,
    uploadWrapperAnimateLoading: uploadWrapperAnimateLoadingReducer,
  },
})
export type RootState = ReturnType<typeof store.getState>
export default store
export type AppDispatch = typeof store.dispatch
