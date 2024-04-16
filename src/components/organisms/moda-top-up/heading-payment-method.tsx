import { SvgIconCustomized } from '@/components/atoms/svg-icon'
import { usePageColor } from '@/hooks/usePageColor'
import { useCloseModal } from '@/redux/modal/hooks'
import { Icons } from '@/themes/_icons'
import { IconButton, Paper, Typography } from '@mui/material'
import { TopUpStep } from './types'
import CloseButton from '@/components/molecules/wrapper-popup/btn-close'
import IconButtonCustomized from '@/components/atoms/icon-button'
type Props = {
  title: string
  handleChangeStep: (step: TopUpStep) => void
}

const PaymentMethodHeading = ({ title, handleChangeStep }: Props) => {
  const handleGetPageColor = usePageColor()

  const pageColor = handleGetPageColor()
  const handleCloseModal = useCloseModal()

  return (
    <Paper
      sx={{
        backgroundColor: pageColor,
        color: (theme) => theme.palette.text.primary,
        position: 'relative',
        px: 8,
        py: 1,
      }}
    >
      <IconButtonCustomized
        onClick={() => {
          handleChangeStep('enter-payment')
        }}
        variant='outlined'
        sx={{
          p: 0,
          position: 'absolute',
          top: '50%',
          left: { xs: 16, md: 16 },
          transform: 'translate(0, -50%)',
        }}
      >
        <SvgIconCustomized
          component={Icons.ArrowLeft}
          sx={{ fontSize: '22.5px' }}
        />
      </IconButtonCustomized>
      <Typography variant='h4' textAlign={'center'}>
        {title}
      </Typography>
      <CloseButton
        onClick={() => {
          handleCloseModal()
        }}
      />
    </Paper>
  )
}

export default PaymentMethodHeading
