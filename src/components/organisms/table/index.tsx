import { SvgIconCustomized } from '@/components/atoms/svg-icon'
import { useAppSelector } from '@/redux/hooks'
import { Icons } from '@/themes/_icons'
import { breakpoints } from '@/themes/_theme'
import { FetchDataStatus } from '@/types'
import {
  CircularProgress,
  Stack,
  TableCellProps,
  TableRow,
  Typography,
  TypographyProps,
} from '@mui/material'
import Box from '@mui/material/Box'
import Table, { TableProps } from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import { constant, times } from 'lodash'
import React, { ReactNode } from 'react'
import { TableLoadingCellStyled, TableNullCellStyled } from './cell'
import { TableCustomizedHead } from './head'
import { HeadCell } from './type'

type Props<T> = {
  headCells: HeadCell<T>[]
  rows: (T | undefined)[]
  renderItems: (item: T | null | undefined) => React.ReactNode
  pagination?: React.ReactNode
  headTypoProps?: TypographyProps
  isFilled?: boolean
  status?: FetchDataStatus
  noItemsText?: string

  loadingCellProps?: TableCellProps
  tableProps?: TableProps

  emptyComponent?: ReactNode
}
export default function TableCustomized<T>(props: Props<T>) {
  const {
    noItemsText,
    headCells,
    rows,
    pagination,
    headTypoProps,
    isFilled = true,
    status,
    renderItems,
    loadingCellProps,
    emptyComponent,
    tableProps,
  } = props

  const lengthAdded = 10 - rows.length > 0 ? 10 - rows.length : 0
  const arrNull = times(lengthAdded, constant(null))
  const resRows = isFilled ? [...rows, ...arrNull] : rows
  const isMobile = useAppSelector((state) => state.app.isMobile)
  return (
    <Stack sx={{ width: '100%', mb: 0, p: 0, pb: 0 }}>
      <TableContainer sx={{ flex: 1 }}>
        <Table
          {...tableProps}
          sx={{
            ['border-collapse']: 'separate',
            minWidth: 100,
            tableLayout: 'fixed',
            ...(tableProps && tableProps.sx),
          }}
          aria-labelledby='tableTitle'
          size={'medium'}
        >
          <TableCustomizedHead
            headCells={headCells}
            headTypoProps={headTypoProps}
          />

          <TableBody
            sx={{
              position: 'relative',
              '& tr td:last-child': {
                paddingRight: { xs: 0, md: '28px' },
              },
            }}
          >
            {status === 'Fetching' && !isMobile ? (
              <>
                <TableRow
                  tabIndex={-1}
                  sx={{ '&:hover': { backgroundColor: 'unset' } }}
                >
                  <TableLoadingCellStyled
                    component={'td'}
                    colSpan={headCells.length}
                    align='center'
                    sx={{
                      borderBottom: '1px solid',
                      borderColor: 'transparent',
                      ...(loadingCellProps && loadingCellProps.sx),
                    }}
                    {...loadingCellProps}
                  >
                    <Stack
                      alignItems={'center'}
                      spacing={4}
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%,-50%)',
                      }}
                    >
                      <Stack alignItems={'center'}>
                        <CircularProgress
                          size={24}
                          sx={{
                            color: 'text.primary',
                          }}
                        ></CircularProgress>
                      </Stack>
                    </Stack>
                  </TableLoadingCellStyled>
                </TableRow>

                {times(9, (index) => null).map((row, index) => {
                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={index}
                      sx={{
                        '&:hover.MuiTableRow-hover': {
                          backgroundColor: 'unset',
                        },
                      }}
                    >
                      {renderItems(row)}
                    </TableRow>
                  )
                })}
              </>
            ) : status === 'Failed' ? (
              <>
                <TableRow
                  tabIndex={-1}
                  sx={{ '&:hover': { backgroundColor: 'unset' } }}
                >
                  <TableNullCellStyled
                    component={'td'}
                    colSpan={headCells.length}
                    align='center'
                  >
                    <Stack
                      alignItems={'center'}
                      spacing={4}
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%,-50%)',
                      }}
                    >
                      <Stack alignItems={'center'}>Some error has occur</Stack>
                    </Stack>
                  </TableNullCellStyled>
                </TableRow>

                {times(9, (index) => null).map((row, index) => {
                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={index}
                      sx={{
                        '&:hover.MuiTableRow-hover': {
                          backgroundColor: 'unset',
                        },
                      }}
                    >
                      {renderItems(row)}
                    </TableRow>
                  )
                })}
              </>
            ) : (
              <>
                {rows.length === 0 ? (
                  <>
                    {times(9, (index) => null).map((row, index) => {
                      return (
                        <TableRow
                          hover
                          tabIndex={-1}
                          key={index}
                          sx={{
                            '&:hover.MuiTableRow-hover': {
                              backgroundColor: 'unset',
                            },
                          }}
                        >
                          {renderItems(row)}
                        </TableRow>
                      )
                    })}
                    <TableRow
                      tabIndex={-1}
                      sx={{
                        '&:hover.MuiTableRow-hover': {
                          backgroundColor: 'unset',
                        },
                      }}
                    >
                      <TableNullCellStyled
                        component={'td'}
                        colSpan={headCells.length}
                        align='center'
                      >
                        <Stack
                          alignItems={'center'}
                          spacing={4}
                          sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '0',
                            right: 0,
                            transform: 'translate(00%,-50%)',
                          }}
                        >
                          {emptyComponent &&
                            status === 'Fetched' &&
                            emptyComponent}
                          {!emptyComponent && status === 'Fetched' && (
                            <>
                              <SvgIconCustomized
                                component={Icons.DocumentRemove}
                                sx={{
                                  fontSize: '60px',
                                  color: 'text.secondary',
                                }}
                              />
                              <Typography variant='body2'>
                                No data available
                              </Typography>
                            </>
                          )}
                        </Stack>
                      </TableNullCellStyled>
                    </TableRow>
                  </>
                ) : (
                  <>
                    {resRows.map((row, index) => {
                      return (
                        <TableRow
                          hover
                          tabIndex={-1}
                          key={index}
                          sx={{
                            [breakpoints.down('md')]: {
                              display: row ? 'flex' : 'none',
                              flexDirection: 'column',
                              borderRadius: '16px',
                              border: '1px solid ',
                              borderColor: 'border.dark',
                              p: 4,
                              '&:hover': {
                                backgroundColor: 'transparent !important',
                              },
                              mb: 2,
                              '& .MuiTableCell-root:first-of-type': {
                                marginTop: 0,
                              },
                            },
                            '&:hover': {
                              ...(row === null && {
                                backgroundColor: 'unset !important',
                              }),
                            },
                          }}
                        >
                          {renderItems(row)}
                        </TableRow>
                      )
                    })}
                  </>
                )}
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Box>{pagination}</Box>
    </Stack>
  )
}
