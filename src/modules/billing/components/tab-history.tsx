import TableCustomized from '@/components/organisms/table'
import TablePaginationCustomized from '@/components/organisms/table/pagination'
import { DEFAULT_FETCH_LIMIT } from '@/constants'
import { DASHBOARD_NAVBAR_HREF } from '@/layouts/dashboard/data'
import { colorTheme } from '@/themes/_color'
import { HistoryUsages } from '@/types/billing'
import { formatFileSize } from '@/utils/tools'
import { times } from 'lodash'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { HISTORY_HEAD_CELLS } from '../resources/data'
import { BillingTag } from '../resources/types'
import HistoryUsageRow from './row-history-usage'
import { useGetHistoryUsages } from '../resources/hooks'
import { FetchDataStatus } from '@/types'
import { breakpoints } from '@/themes/_theme'

const TabHistoryUsage = () => {
  const router = useRouter()
  const color =
    DASHBOARD_NAVBAR_HREF.find((i) => router.asPath.includes(i.rawhref))
      ?.color || colorTheme.general.dotBlue[500]

  const [fetchDataStatus, setFetchDataStatus] =
    useState<FetchDataStatus>('Fetching')
  const [list, setList] = useState<HistoryUsages | null>(null)
  const [total, setTotal] = useState<number>(0)
  const onGetList = useGetHistoryUsages()

  const getTag = (): BillingTag => {
    try {
      return router.query.tag
        ? (router.query.tag?.toString() as BillingTag)
        : 'month-usage'
    } catch (error) {
      return 'month-usage'
    }
  }
  const getPage = () => {
    try {
      return router.query.page ? parseInt(router.query.page?.toString()) : 1
    } catch (error) {
      return 1
    }
  }
  const tag = getTag()
  const page = getPage()

  useEffect(() => {
    if (!router.isReady) return
    if (tag !== 'history-usage') return
    let stale = true
    setFetchDataStatus('Fetching')

    onGetList({
      offset: (page - 1) * DEFAULT_FETCH_LIMIT,
      limit: DEFAULT_FETCH_LIMIT,
    })
      .then((res) => {
        if (stale) {
          setList(res.data.history_usages)
          setTotal(res.data.total_days)
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
  }, [router, page, tag])

  const rows =
    list && list.length > 0
      ? list.map((item) => {
          if (item) {
            return {
              ...item,
              storage_delivery: `${formatFileSize(item.total_storage).size} ${
                formatFileSize(item.total_storage).unit
              }/${formatFileSize(item.total_bandwidth).size} ${
                formatFileSize(item.total_bandwidth).unit
              }`,
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
      <TableCustomized
        tableProps={{
          sx: {
            backgroundColor: { xs: 'primary.dark', md: 'transparent' },
            [breakpoints.down('md')]: {
              '& .MuiTableRow-root': {
                backgroundColor: 'background.paper',
                borderRadius: '8px',
                padding: '8px',
                '&:hover': {
                  backgroundColor: (theme) =>
                    theme.palette.background.paper + ` !important`,
                },
              },
            },
          },
        }}
        headTypoProps={{
          sx: {
            textTransform: 'uppercase',
            textAlign: 'left',
          },
          variant: 'body1',
          fontWeight: 'bold',
        }}
        status={fetchDataStatus}
        noItemsText='There are no history'
        headCells={HISTORY_HEAD_CELLS}
        rows={rows}
        renderItems={(row) => <HistoryUsageRow row={row} />}
        pagination={
          <TablePaginationCustomized
            color={color}
            onPageChange={handleChangePage}
            total={total || 0}
            pageLength={DEFAULT_FETCH_LIMIT}
          />
        }
      />
    </>
  )
}
export default TabHistoryUsage
