import { Icons } from '@/themes/_icons'
import { SortOrder } from '@/types'
import { Typography, TypographyProps } from '@mui/material'
import Box from '@mui/material/Box'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import { visuallyHidden } from '@mui/utils'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { TableCellHeadStyled } from './cell'
import { DEFAULT_CELL_WIDTH } from './data'
import { HeadCell } from './type'

type EnhancedTableProps<T> = {
  headCells: readonly HeadCell<T>[]
  headTypoProps?: TypographyProps
}

export function TableCustomizedHead<T>(props: EnhancedTableProps<T>) {
  const { headCells, headTypoProps } = props
  const createSortHandler =
    (property: keyof T) => (event: React.MouseEvent<unknown>) => {
      handleRequestSort(event, property)
    }
  const [order, setOrder] = React.useState<SortOrder>('ASC')
  const [orderBy, setOrderBy] = React.useState<keyof T | undefined>(undefined)
  const router = useRouter()
  useEffect(() => {
    const sortOrder = router.query.sortOrder
    if (sortOrder) setOrder(sortOrder.toString() as SortOrder)

    const sortBy = router.query.sortBy
    if (sortBy) setOrderBy(sortBy.toString() as keyof T)
  }, [router.query])

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof T
  ) => {
    const isAsc = orderBy === property && order === 'ASC'
    router.replace(
      {
        pathname: router.pathname,
        query: {
          ...router.query,
          sortOrder: isAsc ? 'DESC' : 'ASC',
          sortBy: property.toString(),
        },
      },
      undefined,
      {
        shallow: true,
      }
    )
  }
  return (
    <TableHead sx={{ display: { xs: 'none', md: 'table-header-group;' } }}>
      <TableRow>
        {headCells.map((headCell, index) => (
          <TableCellHeadStyled
            {...headCell.tableCellProps}
            sx={{
              paddingLeft: index === 0 ? '28px' : '0px',
              paddingRight: index === headCells.length - 1 ? '28px' : '0px',
              textAlign: headCell.align ? headCell.align : 'left',
              width: headCell.cellWidth
                ? headCell.cellWidth
                : DEFAULT_CELL_WIDTH,
              ...headCell.tableCellProps?.sx,
            }}
            key={headCell.id as string}
            align={headCell.align ? headCell.align : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
          >
            {headCell.enableSort ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={
                  orderBy === headCell.id
                    ? (order.toLowerCase() as 'asc' | 'desc')
                    : 'asc'
                }
                onClick={createSortHandler(headCell.id)}
                IconComponent={Icons.Sort}
              >
                <Typography
                  variant='subtitle1'
                  {...(headTypoProps && headTypoProps)}
                >
                  {' '}
                  {headCell.label}
                </Typography>

                {orderBy === headCell.id ? (
                  <Box component='span' sx={visuallyHidden}>
                    {order === 'DESC'
                      ? 'sorted descending'
                      : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            ) : (
              <Typography
                variant='subtitle1'
                {...(headTypoProps && headTypoProps)}
              >
                {headCell.label}
              </Typography>
            )}
          </TableCellHeadStyled>
        ))}
      </TableRow>
    </TableHead>
  )
}
