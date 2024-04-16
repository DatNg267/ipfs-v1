import { Stack, Typography, styled, svgIconClasses } from '@mui/material'
import TableCell, { TableCellProps } from '@mui/material/TableCell'
import { ReactNode } from 'react'
import CellContent from './cell-content'
import { breakpoints } from '@/themes/_theme'

export const TableNullCellStyled = styled((props: TableCellProps) => (
  <TableCell padding='none' {...props} />
))(({ theme }) => ({
  border: '1px solid transparent',
  padding: '16px 8px 16px 0px',
  lineHeight: '0',
  textAlign: 'right',
  minHeight: '64px',
  height: '64px',
  '&:hover': {
    backgroundColor: 'unset',
  },
}))
export const TableLoadingCellStyled = styled(TableCell)(({ theme }) => ({
  padding: '16px 8px 16px 0px',
  border: '1px solid transparent',
  lineHeight: '0',
  fontWeight: 500,
  textAlign: 'right',
  minHeight: '64px',
  height: '64px',
  '&:hover': {
    backgroundColor: theme.palette.background.paper,
  },
}))
export const TableCellStyled = styled(TableCell)(({ theme, sx }) => ({
  padding: '16px 16px 16px 0px',
  borderBottom: `1px solid ${theme.palette.baseGray[1000]}`,
  lineHeight: '0',
  fontWeight: 500,
  textAlign: 'left',
  minHeight: '64px',
  height: '64px',
  [breakpoints.down('md')]: {
    padding: '0',
    display: 'flex',
    minHeight: 'auto',
    height: 'auto',
    borderBottom: '1px solid ',
    borderColor: theme.palette.border.light,
    marginTop: '16px',
    [`& .${svgIconClasses.root}`]: {
      fontSize: '18px',
    },
  },
}))
export const TableCellHeadStyled = styled(TableCell)(({ theme }) => ({
  padding: '16px 16px 16px 0px',
  borderBottom: `1px solid ${theme.palette.baseGray[1000]}`,
  lineHeight: '0',
  fontWeight: 500,
  textAlign: 'left',
  minHeight: '64px',
  height: '64px',
}))
type TableCellCustomizedProps = {
  children?: ReactNode
  text?: string
  title: string
  tableCellProps?: any
}
export const TableCellCustomized = ({
  children,
  text,
  title,
  tableCellProps,
}: TableCellCustomizedProps) => {
  return (
    <TableCellStyled {...tableCellProps}>
      <Stack
        justifyContent={{ xs: 'space-between', md: 'unset' }}
        direction={'row'}
        sx={{ width: '100%' }}
        spacing={{ xs: 4, md: 0 }}
      >
        <Typography
          variant='body1'
          fontWeight={'bold'}
          sx={{
            display: { xs: 'block', md: 'none' },
          }}
        >
          {title}
        </Typography>
        {text !== undefined ? (
          <CellContent>{text}</CellContent>
        ) : (
          <>{children}</>
        )}
      </Stack>
    </TableCellStyled>
  )
}
