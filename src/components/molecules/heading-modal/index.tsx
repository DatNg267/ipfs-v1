import { SvgIconCustomized } from '@/components/atoms/svg-icon'
import { usePageColor } from '@/hooks/usePageColor'
import { useCloseModal } from '@/redux/modal/hooks'
import { Icons } from '@/themes/_icons'
import { IconButton, Paper, PaperProps, Typography } from '@mui/material'
type Props = {
  title: string
  wrapperProps?: PaperProps
}

const HeadingModal = ({ title, wrapperProps }: Props) => {
  const handleGetPageColor = usePageColor()
  const handleCloseModal = useCloseModal()
  const color = handleGetPageColor()
  return (
    <Paper
      sx={{
        backgroundColor: color,
        color: (theme) => theme.palette.text.primary,
        position: 'relative',
        px: 8,
        py: 1,
        mb: 1,
        ...wrapperProps,
      }}
    >
      <Typography variant='h4' textAlign={'center'}>
        PIN BY CID
      </Typography>
      <IconButton
        onClick={handleCloseModal}
        sx={{
          p: 1 / 2,
          position: 'absolute',
          top: '50%',
          right: 8,
          transform: 'translate(0, -50%)',
        }}
      >
        <SvgIconCustomized component={Icons.CloseCircle} />
      </IconButton>
    </Paper>
  )
}

export default HeadingModal
