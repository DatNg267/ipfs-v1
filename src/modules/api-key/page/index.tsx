import { Heading, ModalCreate, ModalRevoke, RowComponent } from '../components'

import TableCustomized from '@/components/organisms/table'
import TablePaginationCustomized from '@/components/organisms/table/pagination'
import { useCloseModal, useOpenModal } from '@/redux/modal/hooks'
import { ApplicationModal } from '@/redux/modal/reducer'
import { colorTheme } from '@/themes/_color'
import { ApiKeys } from '@/types/api-key'
import { Container, Paper } from '@mui/material'
import moment from 'moment'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useGetApiKeys, useRevokeApiKey } from '../resources'
import { ApiKeysPageContext, StatusRevoke } from '../resources/context'
import { API_KEYS_HEAD_CELLS } from '../resources/data'
import { ApiKeysRow } from '../resources/types'
import { FetchDataStatus } from '@/types'

type Props = {}
const DEFAULT_LIMIT = 10

const ApiKeysPageContent = (props: Props) => {
  const color = colorTheme.general.dotOrange[500]

  const [apiKeys, setApiKeys] = useState<ApiKeys | null>(null)
  const [selectedApiKey, setSelectedApiKey] = useState<{
    id: string
    name: string
  } | null>(null)
  const [statusRevoke, setStatusRevoke] = useState<StatusRevoke>('none')
  const [total, setTotal] = useState(0)
  const [fetchDataStatus, setFetchDataStatus] =
    useState<FetchDataStatus>('Fetching')

  const onGetApiKeys = useGetApiKeys()
  const onRevokeApiKey = useRevokeApiKey()

  const handleOpenModalRevokeApikey = useOpenModal(
    ApplicationModal.REVOKE_API_KEY
  )

  const handleCloseModal = useCloseModal()
  const router = useRouter()
  const getPage = () => {
    try {
      return router.query.page ? parseInt(router.query.page?.toString()) : 1
    } catch (error) {
      return 1
    }
  }

  const page = getPage() || 1

  useEffect(() => {
    if (!router.isReady) return
    let stale = true
    setFetchDataStatus('Fetching')

    onGetApiKeys({
      offset: (page - 1) * DEFAULT_LIMIT,
      limit: DEFAULT_LIMIT,
    })
      .then((res) => {
        if (stale) {
          setTimeout(() => {
            setApiKeys(res.data.api_keys)
            setTotal(res.data.total)
            setFetchDataStatus('Fetched')
          })
        }
      })
      .catch((err) => {
        setFetchDataStatus('Failed')
      })

    return () => {
      stale = false
      setFetchDataStatus('Fetching')
    }
  }, [router, page])

  const handleGetApiKeys = useCallback(() => {
    onGetApiKeys({
      offset: (page - 1) * DEFAULT_LIMIT,
      limit: DEFAULT_LIMIT,
    })
      .then((res) => {
        setApiKeys(res.data.api_keys)
        setTotal(res.data.total)
      })
      .catch((err) => {})
  }, [onGetApiKeys, page])

  const handleRefreshApiKeysList = useCallback(() => {
    handleGetApiKeys()
  }, [handleGetApiKeys])

  const handleRevokeApiKey = useCallback(
    (id: string) => {
      onRevokeApiKey({
        id,
      })
        .then((res) => {
          setStatusRevoke('none')
          handleRefreshApiKeysList()
          handleCloseModal()
          // Toast message
          toast.success('Revoke success')
        })
        .catch((err) => {
          setStatusRevoke('none')
          handleCloseModal()
          // Toast message
          toast.error(err.message)
        })
    },
    [handleCloseModal, handleRefreshApiKeysList, onRevokeApiKey]
  )
  const handleOpenRevokeModal = useCallback(
    (id: string, name: string) => {
      handleOpenModalRevokeApikey()
      setSelectedApiKey({ id, name })
    },
    [handleOpenModalRevokeApikey]
  )
  const rows: (ApiKeysRow | undefined)[] =
    apiKeys && apiKeys.length > 0
      ? apiKeys.map((apiKey) => {
          if (apiKey) {
            return {
              id: apiKey?.id,
              name: apiKey?.name,
              apiKey: apiKey?.api_key,
              secretKey: apiKey?.secret_key,
              date: moment(apiKey?.created_at).format('LLL'),
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
    <ApiKeysPageContext.Provider
      value={{
        handleRefreshApiKeysList,
        handleRevokeApiKey,
        handleOpenRevokeModal,
        statusRevoke,
        setStatusRevoke,
      }}
    >
      <ModalRevoke id={selectedApiKey?.id} name={selectedApiKey?.name} />
      <ModalCreate />
      <Heading color={color} />
      <Paper sx={{ flex: 1, p: { xs: 2, md: 0 } }}>
        <Container maxWidth='xl'>
          <TableCustomized
            status={fetchDataStatus}
            headCells={API_KEYS_HEAD_CELLS}
            rows={rows}
            renderItems={(row) => <RowComponent row={row} />}
            pagination={
              <TablePaginationCustomized
                onPageChange={handleChangePage}
                total={total || 0}
                pageLength={DEFAULT_LIMIT}
                color={''}
              />
            }
          />
        </Container>
      </Paper>
    </ApiKeysPageContext.Provider>
  )
}
export default ApiKeysPageContent
