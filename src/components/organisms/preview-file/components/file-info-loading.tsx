import styled from '@emotion/styled'
import { List, ListItem, Skeleton } from '@mui/material'

type Props = {}
const ListItemStyled = styled(ListItem)(({ theme }) => ({
  padding: 0,
  marginTop: '8px',
}))
const FileInfoLoading = (props: Props) => {
  return (
    <List disablePadding>
      <ListItemStyled sx={{ mt: 0 }}>
        <Skeleton variant='rectangular' height={28} />
      </ListItemStyled>
      <ListItemStyled>
        <Skeleton variant='rectangular' height={28} />
      </ListItemStyled>
      <ListItemStyled>
        <Skeleton variant='rectangular' height={28} />
      </ListItemStyled>
    </List>
  )
}

export default FileInfoLoading
