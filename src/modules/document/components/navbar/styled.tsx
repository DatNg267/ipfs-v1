import { colorTheme } from '@/themes/_color'
import { styled, svgIconClasses } from '@mui/material'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon, {
  ListItemIconProps,
  listItemIconClasses,
} from '@mui/material/ListItemIcon'
import ListItemText, { ListItemTextProps } from '@mui/material/ListItemText'
export const ListStyled = styled(List)(({ theme }) => ({
  maxWidth: 'unset',
}))

export const ListItemIconStyled = styled((props: ListItemIconProps) => (
  <ListItemIcon {...props} className={props.className + ' ListItemIcon-main'} />
))(({ theme }) => ({
  border: '1px solid',
  borderColor: theme.palette.text.primary,
  borderRadius: '99px',
  minWidth: '40px',
  minHeight: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.text.primary,
  marginRight: '8px',
  [`& .${svgIconClasses.root}`]: {
    fontSize: '20px',
  },
}))
export const ListItemIconChildrenStyled = styled((props: ListItemIconProps) => (
  <ListItemIcon
    {...props}
    className={props.className + ' ListItemIcon-children'}
  />
))(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  color: theme.palette.text.primary,
  marginTop: '10px',
  [`& .${svgIconClasses.root}`]: {
    fontSize: '4px',
  },
  minWidth: '26px',
}))
export const ListItemButtonStyled = styled(ListItemButton)(({ theme }) => ({
  margin: '16px 0',
  marginBottom: '0px',
  padding: 0,
  paddingRight: '8px',
  alignItems: 'center',
  borderRadius: '99px',
  '&:hover': {
    backgroundColor: '#ccccbd',
    [`& .${listItemIconClasses.root}`]: {
      backgroundColor: theme.palette.baseGray[1000],
      color: theme.palette.primary.main,
    },
  },
  '&.selected': {
    backgroundColor: '#ccccbd',
    [`& .${listItemIconClasses.root}`]: {
      backgroundColor: theme.palette.baseGray[1000],
      color: theme.palette.primary.main,
    },
  },
}))
export const ListItemButtonChildrenStyled = styled(ListItemButtonStyled)(
  ({ theme, sx }) => ({
    margin: '8px 0',
    minHeight: '40px',
    '& .MuiListItemText-root .MuiTypography-root': {
      // color: theme.palette.primary.main,
      fontWeight: 500,
    },
    '&:hover': {
      backgroundColor: 'unset',
      '& .MuiListItemIcon-root': {
        backgroundColor: 'unset',
      },
      '& .MuiListItemIcon-root .MuiBox-root': {
        borderRadius: '99px',
        borderColor: theme.palette.baseGray[1000],
        border: 'none',
        backgroundColor: theme.palette.baseGray[1000],
      },
      '& .MuiListItemText-root .MuiTypography-root': {
        // color: theme.palette.primary.main,
        // fontWeight: 600,
      },
    },
    '&.selected': {
      backgroundColor: 'unset',
      '& .MuiListItemIcon-root': {
        backgroundColor: 'unset',
      },
      '& .MuiListItemIcon-root .MuiBox-root': {
        width: '14px',
        height: '14px',
        borderRadius: '99px',
        border: '2px solid',
        borderColor: theme.palette.baseGray[400],
        backgroundColor: theme.palette.baseGray[1000],
      },
      '& .MuiListItemText-root .MuiTypography-root': {
        fontWeight: 600,
        color: `#000`,
      },
    },
  })
)
export const ListItemTextStyled = styled((props: ListItemTextProps) => (
  <ListItemText
    primaryTypographyProps={{
      variant: 'body1',
      fontWeight: 600,
    }}
    {...props}
  />
))(({ theme }) => ({}))
export const ListItemTextChilrenStyled = styled((props: ListItemTextProps) => (
  <ListItemText
    primaryTypographyProps={{
      variant: 'body2',
      fontWeight: 500,
    }}
    {...props}
  />
))(({ theme }) => ({
  paddingRight: '36px',
}))
