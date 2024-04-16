import { isEqual } from 'lodash'
import { memo } from 'react'
import { Text } from '.'
import { toKebabCase } from '@/utils/tools'

type Props = {
  block: any
  component: any
  variant: any
}
const TextHeading = ({ block, component, variant }: Props) => {
  return (
    <Text
      id={`${toKebabCase(block.nodes[0].leaves[0].text)}`}
      block={block.nodes[0]}
      component={component}
      variant={variant}
    ></Text>
  )
}

function areEqual(prevProps: Props, nextProps: Props) {
  return (
    isEqual(prevProps.block, nextProps.block) &&
    isEqual(prevProps.component, nextProps.component) &&
    isEqual(prevProps.variant, nextProps.variant)
  )
}
export default memo(TextHeading, areEqual)
