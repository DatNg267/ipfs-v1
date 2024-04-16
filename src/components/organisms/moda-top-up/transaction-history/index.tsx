import TableCustomized from '@/components/organisms/table'
import TablePaginationCustomized from '@/components/organisms/table/pagination'
import { DEFAULT_FETCH_LIMIT } from '@/constants'
import { DASHBOARD_NAVBAR_HREF } from '@/layouts/dashboard/data'
import { useGetTopUpUsages } from '@/modules/billing/resources/hooks'
import { useAppSelector } from '@/redux/hooks'
import { useUpdateTopUpUsages } from '@/redux/top-up/hooks'
import { colorTheme } from '@/themes/_color'
import { FetchDataStatus } from '@/types'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import {
  TRANSACTION_HISTORY_HEAD_CELLS,
  TransactionHistoryRowData,
} from './data'
import TransactionHistoryRow from './row'
import { Stack } from '@mui/material'
import { TopUpUsages } from '@/types/billing'
import { ScrollBarStyled } from '@/themes/_theme'
type Props = {}
const TransactionHistory = (props: Props) => {
  const router = useRouter()
  const color =
    DASHBOARD_NAVBAR_HREF.find((i) => router.asPath.includes(i.rawhref))
      ?.color || colorTheme.general.dotBlue[500]
  // const { topUpUsages: list } = useAppSelector((state) => state.topUpUsage)
  const [list, setList] = useState<TopUpUsages | null>(null)

  const [total, setTotal] = useState<number>(0)

  const [fetchDataStatus, setFetchDataStatus] =
    useState<FetchDataStatus>('Fetching')

  const onGetList = useGetTopUpUsages()
  const handleUpdateTopUpUsageStore = useUpdateTopUpUsages()

  const getPage = () => {
    try {
      return router.query.page ? parseInt(router.query.page?.toString()) : 1
    } catch (error) {
      return 1
    }
  }
  const page = getPage()

  useEffect(() => {
    if (!router.isReady) return
    let stale = true
    setFetchDataStatus('Fetching')
    onGetList({
      offset: (page - 1) * DEFAULT_FETCH_LIMIT,
      limit: DEFAULT_FETCH_LIMIT,
    })
      .then((res) => {
        if (stale) {
          setList(res.data.top_up_usages)
          setTotal(res.data.totals)
          setFetchDataStatus('Fetched')
        }
      })
      .catch((err) => {
        setFetchDataStatus('Failed')
      })
    let idInterval = setInterval(() => {
      onGetList({
        offset: (page - 1) * DEFAULT_FETCH_LIMIT,
        limit: DEFAULT_FETCH_LIMIT,
      })
        .then((res) => {
          if (stale) {
            setList(res.data.top_up_usages)
            setTotal(res.data.totals)
            setFetchDataStatus('Fetched')
          }
        })
        .catch((err) => {
          setFetchDataStatus('Failed')
        })
    }, 10000)

    return () => {
      stale = false
      clearInterval(idInterval)
      setFetchDataStatus('Fetching')
    }
  }, [router, page])

  const rows: (TransactionHistoryRowData | undefined)[] =
    list && list.length > 0
      ? list
          .map((item) => {
            if (item) {
              return {
                ...item,
                amount_string: item.amount.amount,
              }
            } else {
              return undefined
            }
          })
          .filter((item) => item)
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
    <Stack
      sx={{
        maxHeight: '250px',
      }}
    >
      <TableCustomized
        headTypoProps={{
          sx: {
            textTransform: 'uppercase',
            textAlign: 'left',
          },
          variant: 'body1',
          fontWeight: 'bold',
        }}
        headCells={TRANSACTION_HISTORY_HEAD_CELLS}
        rows={rows}
        status={fetchDataStatus}
        noItemsText='No data available'
        isFilled={false}
        renderItems={(row) => <TransactionHistoryRow row={row} />}
        pagination={
          <TablePaginationCustomized
            color={color}
            onPageChange={handleChangePage}
            total={total || 0}
            pageLength={DEFAULT_FETCH_LIMIT}
          />
        }
      />
    </Stack>
  )
}
export default TransactionHistory
