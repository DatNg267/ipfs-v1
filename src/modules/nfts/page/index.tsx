import { GetNftsResponse, SortByNft } from '@/apis/nft/type'
import { PinnedStatus } from '@/apis/pinning/type'
import TableCustomized from '@/components/organisms/table'
import TablePaginationCustomized from '@/components/organisms/table/pagination'
import { DEFAULT_FETCH_LIMIT } from '@/constants'
import { useGetSearchParams } from '@/hooks/useGetSearchParams'
import { DASHBOARD_NAVBAR_HREF } from '@/layouts/dashboard/data'
import { useCloseModal, useOpenModal } from '@/redux/modal/hooks'
import { ApplicationModal } from '@/redux/modal/reducer'
import { colorTheme } from '@/themes/_color'
import { FetchDataStatus } from '@/types'
import { Nfts } from '@/types/nfts'
import { Container, Paper } from '@mui/material'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import NftEmptyTable from '../components/empty-table'
import NftsHeading from '../components/heading'
import ModalUnpinNft from '../components/modal-unpin'
import UploadNftByCidComponent from '../components/pin-by-cid'
import NftRowComponent from '../components/row'
import UploadNftComponent from '../components/upload'
import {
  NFT_HEAD_CELLS,
  NftRow,
  NftsPageContext,
  StatusUnpin,
  useGetNfts,
  useUnpinNft,
} from '../resources'

const NftPageContent = () => {
  const router = useRouter()
  const color =
    DASHBOARD_NAVBAR_HREF.find((i) => router.asPath.includes(i.href))?.color ||
    colorTheme.general.dotBlue[500]

  const [statusUnpin, setStatusUnpin] = useState<StatusUnpin>('none')
  const [openUpload, setOpenUpload] = useState(false)
  const [openUploadByCid, setOpenUploadByCid] = useState(false)
  const [fetchDataStatus, setFetchDataStatus] =
    useState<FetchDataStatus>('Fetching')

  const [list, setList] = useState<Nfts | null>(null)
  const [selectedKey, setSelectedKey] = useState<{
    nftId: string
  } | null>(null)

  const [total, setTotal] = useState<GetNftsResponse['data']['totals'] | null>(
    null
  )

  const onGetNfts = useGetNfts()
  const onUnpinNft = useUnpinNft()

  const handleCloseModal = useCloseModal()

  const handleOpenModalUnpin = useOpenModal(ApplicationModal.UNPIN_NFT)
  const handleOpenPinByCidModal = useOpenModal(ApplicationModal.PIN_NFT_BY_CID)
  const handleCloseUpload = () => setOpenUpload(false)
  const handleOpenUpload = () => setOpenUpload(true)

  const handleOpenUploadByCid = () => setOpenUploadByCid(true)
  const handleCloseUploadByCid = () => setOpenUploadByCid(false)

  const pinned = (router.query.pinned?.toString() as PinnedStatus) || 'all'
  const { getPage, getSortBy, getSortOrder } = useGetSearchParams()
  const page = getPage() || 1
  const sortBy: SortByNft | undefined = getSortBy()
  const sortOrder = getSortOrder()

  useEffect(() => {
    if (!router.isReady) return
    setFetchDataStatus('Fetching')
    let stale = true
    onGetNfts({
      offset: (page - 1) * DEFAULT_FETCH_LIMIT,
      limit: DEFAULT_FETCH_LIMIT,
      pinned: pinned,
      sortBy,
      sortOrder,
    })
      .then((res) => {
        if (stale) {
          setList(res.data?.nfts || [])
          setTotal(res.data?.totals || 0)
          setFetchDataStatus('Fetched')
        }
      })
      .catch((err) => {
        setFetchDataStatus('Failed')
      })

    return () => {
      stale = false
      setFetchDataStatus('Fetching')
    }
  }, [router, page, pinned])

  const handleGetNfts = useCallback(() => {
    onGetNfts({
      offset: (page - 1) * DEFAULT_FETCH_LIMIT,
      limit: DEFAULT_FETCH_LIMIT,
      pinned: pinned,
      sortBy,
      sortOrder,
    })
      .then((res) => {
        setList(res.data?.nfts || [])
        setTotal(res.data?.totals || 0)
        setFetchDataStatus('Fetched')
      })
      .catch((err) => {
        setFetchDataStatus('Failed')
      })
  }, [onGetNfts, page, pinned, sortBy, sortOrder])

  const handleRefreshList = useCallback(() => {
    handleGetNfts()
  }, [handleGetNfts])

  const handleUnpinNft = useCallback(
    (nftId: string) => {
      setStatusUnpin('pending')
      onUnpinNft({
        nftId,
      })
        .then((res) => {
          setStatusUnpin('none')
          handleRefreshList()
          handleCloseModal()
          toast.success('Unpin success')
        })
        .catch((err) => {
          setStatusUnpin('none')
          handleCloseModal()
          toast.error(err.message)
        })
    },
    [handleCloseModal, handleRefreshList, onUnpinNft]
  )

  const handleOpenUnpinModal = useCallback(
    (nftId: string) => {
      handleOpenModalUnpin()
      setSelectedKey({ nftId })
    },
    [handleOpenModalUnpin]
  )
  const rows: (NftRow | undefined)[] =
    list && list.length > 0
      ? list.map((nft) => {
          if (nft) {
            return {
              ...nft,
              name: nft.metadata_asset.name,
              type: nft.metadata_asset.type,
              status_pinned:
                nft.status === 'pinned' && nft.pinned
                  ? 'Pinned'
                  : nft.status === 'pinned' && !nft.pinned
                  ? 'Unpinned'
                  : nft.status === 'failed'
                  ? 'Failed'
                  : 'Pending',
              action: null,
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

  return (
    <>
      <NftsPageContext.Provider
        value={{
          handleRefreshList,
          // Unpin
          handleUnpinNft,
          handleOpenUnpinModal,
          statusUnpin,
          setStatusUnpin,
          // Pin by file
          handleCloseUpload,
          handleOpenUpload,
          // Pin By Cid
          handleOpenUploadByCid,
          handleCloseUploadByCid,
        }}
      >
        {/* <ModalPinNftByCid /> */}
        <ModalUnpinNft id={selectedKey?.nftId} />

        {openUpload && <UploadNftComponent color={color} />}
        {openUploadByCid && <UploadNftByCidComponent color={color} />}

        {!openUpload && !openUploadByCid && (
          <>
            <NftsHeading />

            <Paper sx={{ flex: 1, p: { xs: 2, md: 0 } }}>
              <Container maxWidth='xl'>
                <TableCustomized
                  status={fetchDataStatus}
                  headCells={NFT_HEAD_CELLS}
                  rows={rows}
                  renderItems={(row) => <NftRowComponent row={row} />}
                  pagination={
                    <TablePaginationCustomized
                      color={color}
                      onPageChange={handleChangePage}
                      total={total?.files || 0}
                      pageLength={DEFAULT_FETCH_LIMIT}
                    />
                  }
                  emptyComponent={
                    <NftEmptyTable
                      handleOpenCreateByCidModal={handleOpenUploadByCid}
                      handleOpenUploadFile={handleOpenUpload}
                    ></NftEmptyTable>
                  }
                />
              </Container>
            </Paper>
          </>
        )}
      </NftsPageContext.Provider>
    </>
  )
}
export default NftPageContent
