import { motion } from 'framer-motion'
import Image from 'next/image'
import { CardImageAnimate } from '../types'

type Props = {
  title?: string
  imageUrl?: string
} & CardImageAnimate

const CardImageCommon = ({
  imageUrl,
  title,
  animate,
  transition,
}: Props & CardImageAnimate) => {
  return (
    <motion.div animate={animate} transition={transition}>
      <Image
        alt={`aioz-${title}`}
        src={imageUrl || ''}
        width={150}
        height={150}
        loading={'lazy'}
      />
    </motion.div>
  )
}

export default CardImageCommon
