import { Paper, PaperProps, styled } from '@mui/material'

export const ContentWrap = styled((props: PaperProps) => <Paper {...props} />)(
  ({ theme }) => ({
    boxShadow: 'none',
    margin: 0,
    padding: '16px',

    borderRadius: '16px',
    borderTop: '1px solid #CCCCBD',
    borderRight: '1px solid #CCCCBD',
    borderBottom: '4px solid #CCCCBD',
    borderLeft: '1px solid #CCCCBD',

    '&:hover': {
      borderTop: '1px solid #333',
      borderRight: '1px solid #333',
      borderBottom: '4px solid #333',
      borderLeft: '1px solid #333',
    },
  })
)
