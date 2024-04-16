import TableCustomized from '@/components/organisms/table'
import TablePaginationCustomized from '@/components/organisms/table/pagination'
import { DEFAULT_FETCH_LIMIT } from '@/constants'
import { DASHBOARD_NAVBAR_HREF } from '@/layouts/dashboard/data'
import { useAppSelector } from '@/redux/hooks'
import { useUpdateTopUpUsages } from '@/redux/top-up/hooks'
import { colorTheme } from '@/themes/_color'
import { breakpoints } from '@/themes/_theme'
import { FetchDataStatus } from '@/types'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { TOPUP_HEAD_CELLS } from '../resources/data'
import { useGetTopUpUsages } from '../resources/hooks'
import { BillingTag, TopUpUsageRowData } from '../resources/types'
import TopUpUsageRow from './row-top-up-usage'
type Props = {}

const TabTopUpUsage = (props: Props) => {
  const router = useRouter()
  const color =
    DASHBOARD_NAVBAR_HREF.find((i) => router.asPath.includes(i.rawhref))
      ?.color || colorTheme.general.dotBlue[500]
  const { topUpUsages: list } = useAppSelector((state) => state.topUpUsage)
  const [total, setTotal] = useState<number>(0)
  const [fetchDataStatus, setFetchDataStatus] =
    useState<FetchDataStatus>('Fetching')

  const onGetList = useGetTopUpUsages()
  const handleUpdateTopUpUsageStore = useUpdateTopUpUsages()
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
    if (tag !== 'top-up') return
    let stale = true
    setFetchDataStatus('Fetching')

    onGetList({
      offset: (page - 1) * DEFAULT_FETCH_LIMIT,
      limit: DEFAULT_FETCH_LIMIT,
    })
      .then((res) => {
        if (stale) {
          // setList(res.data.top_up_usages)
          setTotal(res.data.totals)
          handleUpdateTopUpUsageStore(res.data.top_up_usages)
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

  const rows: (TopUpUsageRowData | undefined)[] =
    list && list.length > 0
      ? list.map((item) => {
          if (item) {
            return {
              ...item,
              amount_string: item.amount.amount,
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
        headCells={TOPUP_HEAD_CELLS}
        rows={rows}
        status={fetchDataStatus}
        noItemsText='No data available'
        renderItems={(row) => <TopUpUsageRow row={row} />}
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
export default TabTopUpUsage
