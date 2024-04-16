import { GetGatewaysResponse } from '@/apis/gateway/type'
import TableCustomized from '@/components/organisms/table'
import TablePaginationCustomized from '@/components/organisms/table/pagination'
import { DEFAULT_FETCH_LIMIT } from '@/constants'
import { Gateways } from '@/types/gateways'
import { colorTheme } from '@/themes/_color'
import { Paper } from '@mui/material'
import { times } from 'lodash'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import GateWayHeading from '../components/heading'
import GateWayRowComponent from '../components/row'
import { GatewaysPageContext } from '../resources/context'
import { GATEWAY_HEADER_CELLS } from '../resources/data'
import { GatewayRow } from '../resources/types'
import { useGetGateways } from '../resources/hooks'
import { DASHBOARD_NAVBAR_HREF } from '@/layouts/dashboard/data'
import { FetchDataStatus } from '@/types'
import { useGetSearchParams } from '@/hooks/useGetSearchParams'

type Props = {}

const GatewayPageContent = (props: Props) => {
  const router = useRouter()
  const color =
    DASHBOARD_NAVBAR_HREF.find((i) => router.asPath.includes(i.href))?.color ||
    colorTheme.general.dotBlue[500]

  const [subcribe, setSubcribe] = useState<boolean>(false)
  const [fetchDataStatus, setFetchDataStatus] =
    useState<FetchDataStatus>('Fetching')
  const [list, setList] = useState<Gateways | null>(null)
  const [total, setTotal] = useState<
    GetGatewaysResponse['data']['totals'] | null
  >(null)

  const onGetList = useGetGateways()

  const { getPage, getTypeGateway } = useGetSearchParams()

  const page = getPage()
  const type = getTypeGateway()

  const rows: (GatewayRow | undefined)[] =
    list && list.length > 0
      ? list.map((item) => {
          if (item) {
            return {
              ...item,
            }
          } else {
            return undefined
          }
        })
      : []

  const handleGetNfts = useCallback(() => {
    onGetList({
      offset: (page - 1) * DEFAULT_FETCH_LIMIT,
      limit: DEFAULT_FETCH_LIMIT,
      type,
    })
      .then((res) => {
        setList(res.data.gateways)
        setTotal(res.data.totals)
      })
      .catch((err) => {})
  }, [onGetList, page])

  const handleRefreshList = useCallback(() => {
    handleGetNfts()
  }, [handleGetNfts])

  useEffect(() => {
    if (!router.isReady) return
    let stale = true
    setFetchDataStatus('Fetching')

    onGetList({
      offset: (page - 1) * DEFAULT_FETCH_LIMIT,
      limit: DEFAULT_FETCH_LIMIT,
      type,
    })
      .then((res) => {
        if (stale) {
          setTimeout(() => {
            setList(res.data.gateways)
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
  const handleUpdateSubribe = (value: boolean) => setSubcribe(value)
  return (
    <GatewaysPageContext.Provider
      value={{
        handleRefreshList,
        handleUpdateSubribe,
        subcribe,
      }}
    >
      <GateWayHeading color={color} />
      <Paper sx={{ flex: 1, p: 0 }}>
        <TableCustomized
          status={fetchDataStatus}
          noItemsText='There are no gateway services available'
          headCells={GATEWAY_HEADER_CELLS}
          rows={rows}
          renderItems={(row) => <GateWayRowComponent row={row} />}
          pagination={
            <TablePaginationCustomized
              color={color}
              onPageChange={handleChangePage}
              total={total || 0}
              pageLength={DEFAULT_FETCH_LIMIT}
            />
          }
        />
      </Paper>
    </GatewaysPageContext.Provider>
  )
}

export default GatewayPageContent
