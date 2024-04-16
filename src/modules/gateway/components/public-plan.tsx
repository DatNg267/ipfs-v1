import { SvgIconCustomized } from '@/components/atoms/svg-icon'
import { Icons } from '@/themes/_icons'
import {
  Stack,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
} from '@mui/material'
import React from 'react'
import { PUBLIC_GATEWAYS_CONTENT } from '../resources/data'

type Props = {}

const PublicPlan = (props: Props) => {
  return (
    <Stack sx={{ height: '100%' }} spacing={4} justifyContent={'space-between'}>
      <Stack alignItems={'center'}>
        <Typography variant='subtitle2' fontWeight={700}>
          PUBLIC GATEWAY
        </Typography>
        <Typography variant='h2' fontWeight={700}>
          FREE
        </Typography>
      </Stack>
      <List
        disablePadding
        sx={{
          flex: 1,
          '& .MuiListItemIcon-root': {
            minWidth: '0px',
            color: 'text.primary',
            mr: 2,
          },
          '& .MuiListItemText-root': {
            m: 0,
          },
          '& .MuiListItemText-root .MuiTypography-root': {
            fontWeight: 500,
          },
          '& .MuiListItem-root': {
            p: 0,
          },
          '& .MuiListItem-root:not(:first-of-type)': {
            mt: { xs: 2, md: 4 },
          },
        }}
      >
        {PUBLIC_GATEWAYS_CONTENT.map((item, index) => (
          <ListItem key={index}>
            <ListItemIcon>
              <SvgIconCustomized component={Icons.Check} />
            </ListItemIcon>
            <ListItemText>{item}</ListItemText>
          </ListItem>
        ))}
      </List>
      <Button
        size='large'
        fullWidth
        variant='outlined'
        color='secondary'
        sx={{
          borderColor: 'border.dark',
          pointerEvents: 'none',
        }}
      >
        <SvgIconCustomized
          component={Icons.Check}
          sx={{
            color: 'inherit',
            mr: 1,
          }}
        />
        Activated
      </Button>
    </Stack>
  )
}

export default PublicPlan
