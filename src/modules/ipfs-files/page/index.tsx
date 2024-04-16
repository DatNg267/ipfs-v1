import {
  GetIpfsFilesReponse,
  PinnedStatus,
  SortByIpfsFile,
} from '@/apis/pinning/type'
import UploadHeading from '@/components/molecules/upload-heading'
import ModalReviewFile from '@/components/organisms/modal-review-file'
import ModalReviewFolder from '@/components/organisms/modal-review-files'
import TableCustomized from '@/components/organisms/table'
import TablePaginationCustomized from '@/components/organisms/table/pagination'
import { DEFAULT_FETCH_LIMIT } from '@/constants'
import { useGetSearchParams } from '@/hooks/useGetSearchParams'
import { useCloseModal, useOpenModal } from '@/redux/modal/hooks'
import { ApplicationModal } from '@/redux/modal/reducer'
import { colorTheme } from '@/themes/_color'
import { breakpoints } from '@/themes/_theme'
import { FetchDataStatus } from '@/types'
import { IpfsFiles, Metadata } from '@/types/ipfs-file'
import { Container, Paper } from '@mui/material'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import IpfsEmptyTable from '../components/empty-table'
import IpfsFilesHeading from '../components/heading'
import ModalEditIpfsFile from '../components/modal-edit'
import ModalPinByCid from '../components/modal-pin-cid'
import ModalUnpinIpfsFile from '../components/modal-unpin'
import IpfsFileRowComponent from '../components/row'
import UploadFileComponent from '../components/upload'
import {
  FILE_HEAD_CELLS,
  FILE_PENDING_STATUS,
  IpfsFileRow,
  IpfsFilesPageContext,
  StatusDelete,
  StatusFiles,
  StepUploadFile,
} from '../resources'
import {
  useDeleteIpfsFile,
  useGetFile,
  useGetIpfsFiles,
} from '../resources/hooks'
import { getStatus } from '../resources/services'
const STEP_DESCRIPTION = ['Upload Files To Form', 'Get your link!']
const IpfsFilePageContent = () => {
  const color = colorTheme.general.dotMint[500]
  const [step, setStep] = useState<StepUploadFile | null>(null)
  const [files, setFiles] = useState<IpfsFiles | null>(null)

  const [selectedItemEdit, setSelectedItemEdit] = useState<{
    pinId: string
    metadata: Metadata
  } | null>(null)
  const [selectedKey, setSelectedKey] = useState<{
    pinId: string
  } | null>(null)

  const [stackPendingFile, setStackPendingFile] = useState<string[] | null>(
    null
  )
  const [fetchDataStatus, setFetchDataStatus] =
    useState<FetchDataStatus>('Fetching')
  const [statusDelete, setStatusDelete] = useState<StatusDelete>('none')

  const [total, setTotal] = useState<
    GetIpfsFilesReponse['data']['totals'] | null
  >(null)

  const onGetIpfsFiles = useGetIpfsFiles()
  const onGetPenddingFile = useGetFile()
  const onDeleteIpfsFile = useDeleteIpfsFile()

  const handleOpenModalUnpinIpfsFile = useOpenModal(
    ApplicationModal.DELETE_IPFS_FILE
  )
  const handleOpenModalEditIpfsFile = useOpenModal(
    ApplicationModal.EDIT_IPFS_FILE
  )
  const handleOpenCreateByCidModal = useOpenModal(ApplicationModal.PIN_BY_CID)
  const handleCloseModal = useCloseModal()
  const router = useRouter()

  const pinned = (router.query.pinned?.toString() as PinnedStatus) || 'all'
  const sortBy: SortByIpfsFile | undefined =
    router.query.sortBy?.toString() === 'date_pinned'
      ? 'created_at'
      : (router.query.sortBy?.toString() as SortByIpfsFile)
  const { getPage, getSortBy, getSortOrder } = useGetSearchParams()

  const page = getPage() || 1
  const sortOrder = getSortOrder()
  useEffect(() => {
    handleGetStackPending(files)
  }, [files])
  const handleGetStackPending = (list: IpfsFiles) => {
    let stack: any[] = []
    if (!list || list.length === 0) {
      setStackPendingFile(null)
      return
    }
    list.forEach((file) => {
      if (
        file?.status &&
        FILE_PENDING_STATUS.findIndex((item) => item === file?.status) >= 0
      ) {
        stack.push(file.id)
      }
    })
    setStackPendingFile(stack)
  }

  const handleGetPendingFiles = async (stack: string[]) => {
    try {
      let completedStack = stack
      const reponse = await Promise.all(
        stack.map(async (id: string, index) => {
          await onGetPenddingFile({ pinId: id })
            .then((res) => {
              if (!res) return
              setFiles((prev) => {
                if (!prev) return prev
                const index = prev.findIndex((item) => item?.id === id)
                if (index === -1) return prev
                completedStack = [
                  ...completedStack.slice(0, index),
                  ...completedStack.slice(index + 1, completedStack.length),
                ]
                return [
                  ...prev.slice(0, index),
                  res.data,
                  ...prev.slice(index + 1, prev.length),
                ]
              })
            })
            .catch((err) => {
              completedStack = [
                ...completedStack.slice(0, index),
                ...completedStack.slice(index + 1, completedStack.length),
              ]
            })
        })
      )
      // if (completedStack.length === 0) setStackPendingFile(null)
      // else setStackPendingFile([...completedStack])
    } catch (error) {}
  }
  useEffect(() => {
    if (!stackPendingFile || stackPendingFile.length === 0) return
    let intervalId = setInterval(() => {
      handleGetPendingFiles(stackPendingFile)
    }, 10000)

    return () => clearInterval(intervalId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stackPendingFile])

  useEffect(() => {
    if (!router.isReady) return
    let stale = true
    setFetchDataStatus('Fetching')
    onGetIpfsFiles({
      offset: (page - 1) * DEFAULT_FETCH_LIMIT,
      limit: DEFAULT_FETCH_LIMIT,
      pinned: pinned,
      sortOrder: sortOrder,
      sortBy: sortBy,
    })
      .then((res) => {
        if (stale) {
          setTimeout(() => {
            setFiles(res.data?.pins || [])
            handleGetStackPending(res.data?.pins || [])
            setTotal(res.data?.totals || 0)
            setFetchDataStatus('Fetched')
          })
        }
      })
      .catch((err) => {
        setFetchDataStatus('Failed')
      })
    return () => {
      setFetchDataStatus('Fetching')
      stale = false
    }
  }, [router, page, pinned, sortOrder, sortBy])

  const handleGetIpfsFiles = useCallback(() => {
    onGetIpfsFiles({
      offset: (page - 1) * DEFAULT_FETCH_LIMIT,
      limit: DEFAULT_FETCH_LIMIT,
      pinned: pinned,
      sortOrder: sortOrder,
      sortBy: sortBy,
    })
      .then((res) => {
        setFiles(res.data?.pins || [])
        handleGetStackPending(res.data?.pins || [])
        setTotal(res.data?.totals || 0)
        setFetchDataStatus('Fetched')
      })
      .catch((err) => {
        setFetchDataStatus('Failed')
      })
  }, [onGetIpfsFiles, page, pinned, sortOrder, sortBy])

  const handleRefreshList = useCallback(() => {
    handleGetIpfsFiles()
  }, [handleGetIpfsFiles])

  const handleDeleteIpfsFile = useCallback(
    (pinId: string) => {
      onDeleteIpfsFile({
        pinId,
      })
        .then((res) => {
          setStatusDelete('none')
          handleRefreshList()
          handleCloseModal()
          // Toast message
          toast.success('Unpin success')
        })
        .catch((err) => {
          setStatusDelete('none')
          // handleCloseModal()
          // Toast message
          toast.error(err.message)
        })
    },
    [handleCloseModal, handleRefreshList, onDeleteIpfsFile]
  )

  const handleOpenEditModal = useCallback(
    (pinId: string, metadata: Metadata) => {
      handleOpenModalEditIpfsFile()
      setSelectedItemEdit({ pinId, metadata })
    },
    [handleOpenModalEditIpfsFile]
  )
  const handleOpenDeleteModal = useCallback(
    (pinId: string) => {
      handleOpenModalUnpinIpfsFile()
      setSelectedKey({ pinId })
    },
    [handleOpenModalUnpinIpfsFile]
  )
  const rows: (IpfsFileRow | undefined)[] =
    files && files.length > 0
      ? files.map((file) => {
          if (file) {
            return {
              ...file,
              action: '',
              name: file.metadata.name,
              type: file.metadata.type,
              status_pinned:
                getStatus(file.status) === StatusFiles.PINNED && !file.pinned
                  ? StatusFiles.DELETED
                  : getStatus(file.status),
            }
          } else {
            return undefined
          }
        })
      : []

  const handleChangePage = useCallback(
    (e: any, index: number) => {
      router.replace(
        {
          pathname: router.pathname,
          query: { ...router.query, page: index },
        },
        undefined,
        { shallow: true }
      )
    },
    [router]
  )

  const handleOpenStep = (stepName: StepUploadFile | null) => setStep(stepName)
  const handleCloseUploadFile = () => setStep(null)
  const handleOpenUpload = () => setStep('Upload')

  return (
    <IpfsFilesPageContext.Provider
      value={{
        handleRefreshList,
        handleDeleteIpfsFile,
        handleOpenDeleteModal,
        handleOpenEditModal,
        handleOpenStep,
        handleCloseUploadFile,
        setStatusDelete,
        step,
        statusDelete,
        fetchDataStatus,
        selectedItemEdit,
      }}
    >
      <ModalUnpinIpfsFile pinId={selectedKey?.pinId} />
      <ModalEditIpfsFile />
      <ModalPinByCid />
      <ModalReviewFolder />
      <ModalReviewFile />
      {step !== null && (
        <>
          <UploadHeading
            handleCloseUpload={handleCloseUploadFile}
            color={color}
            text={step === 'Upload' ? STEP_DESCRIPTION[0] : STEP_DESCRIPTION[1]}
          />
          {/* <UploadFileHeading title={} /> */}
          <UploadFileComponent />
        </>
      )}
      {step === null && (
        <>
          <IpfsFilesHeading
            totalFiles={total?.files ? total.files : 0}
            totalSize={total?.size ? total.size : 0}
            handleOpenCreateByCidModal={handleOpenCreateByCidModal}
            handleOpenUploadFile={handleOpenUpload}
          />
          <Paper
            sx={{
              flex: 1,
              p: 0,
              [breakpoints.down('md')]: {
                p: 2,
              },
            }}
          >
            <Container maxWidth='xl'>
              <TableCustomized
                noItemsText={'There are no files'}
                status={fetchDataStatus}
                headCells={FILE_HEAD_CELLS}
                rows={rows}
                renderItems={(row) => <IpfsFileRowComponent row={row} />}
                pagination={
                  <TablePaginationCustomized
                    color={color}
                    onPageChange={handleChangePage}
                    total={total?.files || 0}
                    pageLength={DEFAULT_FETCH_LIMIT}
                  />
                }
                emptyComponent={
                  <IpfsEmptyTable
                    handleOpenCreateByCidModal={handleOpenCreateByCidModal}
                    handleOpenUploadFile={handleOpenUpload}
                  ></IpfsEmptyTable>
                }
              />
            </Container>
          </Paper>
        </>
      )}
    </IpfsFilesPageContext.Provider>
  )
}
export default IpfsFilePageContent
