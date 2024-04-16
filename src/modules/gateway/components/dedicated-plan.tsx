import { SvgIconCustomized } from '@/components/atoms/svg-icon'
import { Icons } from '@/themes/_icons'
import {
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material'
import { DEDICATE_GATEWAYS_CONTENT } from '../resources/data'
import { useOpenModal } from '@/redux/modal/hooks'
import { ApplicationModal } from '@/redux/modal/reducer'
import { useCallback, useContext } from 'react'
import { GatewaysPageContext } from '../resources/context'
import ButtonCustomized from '@/components/atoms/button'

const DedicatedPlan = () => {
  const { subcribe, handleChangeSpeedMonitor } = useContext(GatewaysPageContext)
  const handleOpenModal = useCallback(
    useOpenModal(
      subcribe
        ? ApplicationModal.UNSUBCRIBE_DEDICATED_GATEWAYS
        : ApplicationModal.SUBCRIBE_DEDICATED_GATEWAYS
    ),
    [subcribe]
  )
  return (
    <Stack sx={{ height: '100%' }} spacing={4} justifyContent={'space-between'}>
      <Stack alignItems={'center'}>
        <Typography variant='subtitle2' fontWeight={700}>
          DEDICATED GATEWAY
        </Typography>
        <Typography variant='h2' fontWeight={700}>
          $7/1TB
        </Typography>
      </Stack>
      <List
        disablePadding
        sx={{
          flex: 1,
          '& .MuiListItemIcon-root': {
            minWidth: '0px',
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
        {DEDICATE_GATEWAYS_CONTENT.map((item, index) => (
          <ListItem key={index}>
            <ListItemIcon>
              <SvgIconCustomized
                component={Icons.Check}
                sx={{
                  color: (theme) => theme.palette.green[500],
                }}
              />
            </ListItemIcon>
            <ListItemText>{item}</ListItemText>
          </ListItem>
        ))}
      </List>
      <ButtonCustomized
        size='large'
        fullWidth
        variant={subcribe ? 'outlined' : 'contained'}
        color={subcribe ? 'primary' : 'primary'}
        onClick={handleOpenModal}
        onMouseOver={(e) => {
          handleChangeSpeedMonitor(true)
        }}
        onMouseLeave={(e) => {
          handleChangeSpeedMonitor(false)
        }}
      >
        {subcribe ? (
          <>
            <SvgIconCustomized
              component={Icons.Check}
              sx={{
                color: 'inherit',
                mr: 1,
              }}
            ></SvgIconCustomized>
            Unsubscribe
          </>
        ) : (
          'Subscribe'
        )}
      </ButtonCustomized>
    </Stack>
  )
}

export default DedicatedPlan
