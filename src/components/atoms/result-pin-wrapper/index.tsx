import { breakpoints } from '@/themes/_theme'
import { Paper, styled } from '@mui/material'

export const ResultPinWrapper = styled(Paper)(({ theme }) => ({
  boxShadow: 'none',
  border: '1px solid',
  borderColor: theme.palette.baseGray[500],
  padding: '28px',
  margin: 0,
  backgroundColor: theme.palette.background.paper,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
  borderRadius: '16px',
  [breakpoints.down('md')]: {
    borderRadius: '8px',
    padding: '16px',
  },
}))
