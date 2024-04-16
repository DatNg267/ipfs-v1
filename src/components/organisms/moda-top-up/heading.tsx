import IconButtonCustomized from '@/components/atoms/icon-button'
import { SvgIconCustomized } from '@/components/atoms/svg-icon'
import CloseButton from '@/components/molecules/wrapper-popup/btn-close'
import { usePageColor } from '@/hooks/usePageColor'
import { useCloseModal } from '@/redux/modal/hooks'
import { Icons } from '@/themes/_icons'
import { IconButton, Paper, Typography } from '@mui/material'
type Props = {
  title: string
}

const TopUpModalHeading = ({ title }: Props) => {
  const handleGetPageColor = usePageColor()

  const pageColor = handleGetPageColor()
  const handleCloseModal = useCloseModal()

  return (
    <Paper
      sx={{
        backgroundColor: pageColor,
        color: (theme) => theme.palette.text.primary,
        position: 'relative',
        px: { xs: 2, md: 8 },
        py: 1,
      }}
    >
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

export default TopUpModalHeading
