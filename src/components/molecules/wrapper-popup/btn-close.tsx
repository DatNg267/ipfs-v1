import IconButtonCustomized from '@/components/atoms/icon-button'
import { SvgIconCustomized } from '@/components/atoms/svg-icon'
import { Icons } from '@/themes/_icons'

type Props = {
  [key: string]: any
}

const CloseButton = ({ ...props }: Props) => {
  return (
    <IconButtonCustomized
      variant='outlined'
      color='error'
      {...props}
      sx={{
        p: 0,
        position: 'absolute',
        top: '50%',
        right: 16,
        transform: 'translate(0, -50%)',
        ...(props && props.sx ? props.sx : {}),
      }}
    >
      <SvgIconCustomized
        component={Icons.Close}
        sx={{
          fontSize: '22.5px',
        }}
      />
    </IconButtonCustomized>
  )
}

export default CloseButton
