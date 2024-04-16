import React from 'react'
import { SvgIconCustomized } from '../../atoms/svg-icon'
import { Icons } from '@/themes/_icons'
import { Button, styled, Typography, Stack, IconButton } from '@mui/material'
import { useRouter } from 'next/router'
import { useCurrentPage } from '@/hooks/useCurrentPage'
import { fill, times } from 'lodash'

type Props = {
  onPageChange: (event: unknown, newPage: number) => any
  pageLength?: number
  total?: number
  color: string
}
const ButtonStyled = styled(Button)(({ theme, sx }) =>
  theme.unstable_sx({
    borderWidth: '1px',
    borderRadius: '99px',
    padding: 0,
    paddingBottom: '0px !important',
    minHeight: '28px',
    minWidth: '28px',
    '&:hover': {
      borderWidth: '1px',
      backgroundColor: theme.palette.dotOrange[500],
    },
    ...sx,
  })
)

const TablePaginationCustomized = ({
  onPageChange,
  pageLength = 10,
  total = 0,
  color,
}: Props) => {
  const router = useRouter()
  const lastPage =
    parseInt((total / pageLength).toString()) +
    (total % pageLength === 0 ? 0 : 1)

  let lengthStart = 0
  let lengthMiddle = 0
  let lengthEnd = 0

  const currentPage = useCurrentPage()
  // const currentPage = 2

  if (lastPage <= 6) {
    lengthStart = lastPage
    lengthMiddle = 0
    lengthEnd = 0
  } else if (lastPage >= 7) {
    const spaceStart = currentPage - 3
    const spaceEnd = currentPage + 3
    if (spaceStart >= 1 && spaceEnd < lastPage) {
      lengthStart = 1
      lengthMiddle = 5
      lengthEnd = lastPage - (currentPage + 3) > 0 ? 1 : 0
    } else if (spaceStart <= 1) {
      lengthStart = 5
      lengthMiddle = 0
      lengthEnd = 1
    } else if (spaceEnd >= lastPage) {
      lengthStart = 1
      lengthMiddle = 0
      lengthEnd = 5
    }
  }

  const arrLengthStart =
    lengthStart > 0 ? times(lengthStart, (index) => index + 1) : []
  const arrLengthMiddle =
    lengthMiddle >= 0
      ? times(lengthMiddle, (index) => {
          if (index < 2) {
            return currentPage + index - 2
          } else if (index === 2) {
            return currentPage
          } else {
            return currentPage + (index - 2)
          }
        })
      : []
  const arrLengthEnd =
    lengthEnd > 0
      ? times(lengthEnd, (index) => lastPage - (lengthEnd - index - 1))
      : []

  return (
    <Stack
      alignItems={'center'}
      direction={'row'}
      spacing={2}
      justifyContent={'center'}
      p={4}
      sx={{ minHeight: '60px' }}
    >
      {arrLengthStart.length === 0 &&
      arrLengthMiddle.length === 0 &&
      arrLengthEnd.length === 0 ? (
        <></>
      ) : (
        <>
          <IconButton
            sx={{
              padding: 0,
              color: (theme) => theme.palette.text.primary,
              '&.Mui-disabled': {
                color: (theme) => theme.palette.baseGray[500],
              },
            }}
            disabled={!(currentPage - 1 > 0)}
            onClick={(e) =>
              currentPage - 1 > 0 && onPageChange(e, currentPage - 1)
            }
          >
            <SvgIconCustomized
              component={Icons.CircleArrowLeftThin}
              sx={{
                fontSize: '28px',
                cursor: 'pointer',
              }}
            ></SvgIconCustomized>
          </IconButton>

          {arrLengthStart.length > 0 &&
            arrLengthStart.map((i) => (
              <ButtonStyled
                onClick={(e) => onPageChange(e, i)}
                variant='outlined'
                color='secondary'
                key={i}
                sx={{
                  '&:hover': {
                    color: 'inherit',
                    borderWidth: '1px',
                    backgroundColor: color
                      ? color
                      : (theme) => theme.palette.dotOrange[500],
                  },
                  backgroundColor:
                    currentPage === i
                      ? color
                        ? color
                        : (theme) => theme.palette.dotOrange[500]
                      : 'inherit',
                }}
              >
                <Typography variant='button' fontWeight={'normal'}>
                  {i}
                </Typography>
              </ButtonStyled>
            ))}
          {arrLengthMiddle.length > 0 && (
            <Typography
              variant='button'
              fontWeight={'bold'}
              sx={{
                px: { xs: 0, md: 2 },
              }}
            >
              ...
            </Typography>
          )}
          {arrLengthMiddle.length > 0 &&
            arrLengthMiddle.map((i, index) => (
              <ButtonStyled
                onClick={(e) => onPageChange(e, i)}
                variant='outlined'
                color='secondary'
                key={i}
                sx={{
                  // display: index >= 3 ? { xs: 'none', md: 'flex' } : 'flex',
                  '&:hover': {
                    color: 'inherit',

                    borderWidth: '1px',
                    backgroundColor: color
                      ? color
                      : (theme) => theme.palette.dotOrange[500],
                  },
                  backgroundColor:
                    currentPage === i
                      ? color
                        ? color
                        : (theme) => theme.palette.dotOrange[500]
                      : 'inherit',
                }}
              >
                <Typography variant='button' fontWeight={'normal'}>
                  {i}
                </Typography>
              </ButtonStyled>
            ))}
          {arrLengthEnd.length > 0 && (
            <Typography
              variant='button'
              fontWeight={'bold'}
              sx={{
                px: { xs: 0, md: 2 },
              }}
            >
              ...
            </Typography>
          )}
          {arrLengthEnd.length > 0 &&
            arrLengthEnd.map((i) => (
              <ButtonStyled
                onClick={(e) => onPageChange(e, i)}
                variant='outlined'
                color='secondary'
                key={i}
                sx={{
                  '&:hover': {
                    color: 'inherit',
                    borderWidth: '1px',
                    backgroundColor: color
                      ? color
                      : (theme) => theme.palette.dotOrange[500],
                  },
                  backgroundColor:
                    currentPage === i
                      ? color
                        ? color
                        : (theme) => theme.palette.dotOrange[500]
                      : 'inherit',
                }}
              >
                <Typography variant='button' fontWeight={'normal'}>
                  {i}
                </Typography>
              </ButtonStyled>
            ))}
          <IconButton
            sx={{
              p: 0,
              color: (theme) => theme.palette.text.primary,
              '&.Mui-disabled': {
                color: (theme) => theme.palette.baseGray[500],
              },
            }}
            disabled={!(currentPage < lastPage)}
            onClick={(e) =>
              currentPage < lastPage && onPageChange(e, currentPage + 1)
            }
          >
            <SvgIconCustomized
              component={Icons.CircleArrowRightThin}
              sx={{
                fontSize: '28px',
                cursor: 'pointer',
              }}
            ></SvgIconCustomized>
          </IconButton>
        </>
      )}
    </Stack>
  )
}

export default TablePaginationCustomized
