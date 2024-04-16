import { colorTheme } from '@/themes/_color'
import { Box, Typography } from '@mui/material'
import { isEqual } from 'lodash'
import { memo } from 'react'
import { DocumentText, DocumentTextInline } from './types'

type TextProps = {
  block: DocumentText
  component?: any
  variant?: any
  [key: string]: any
}
export const Text = ({ block, component, variant, ...props }: TextProps) => {
  return (
    <>
      {block.leaves.map((textItem, index) => {
        let reprops = {
          fontWeight: 'normal',
          component: component ? component : 'span',
          text: textItem.text,
        }
        textItem.marks.map((markItem) => {
          if (markItem.type === 'code')
            reprops = { ...reprops, component: 'code' }
          if (markItem.type === 'bold')
            reprops = { ...reprops, fontWeight: 'medium' }
        })
        if (reprops.component === 'code') {
          return (
            <Typography
              key={index}
              variant={variant ? variant : 'body2'}
              fontWeight={reprops.fontWeight}
              component={'code'}
              sx={{
                backgroundColor: colorTheme.document.varibleBackground,
                padding: '0.2em 0.4em',
                borderRadius: '6px',
                ...props.sx,
              }}
              {...props}
            >
              {reprops.text}
            </Typography>
          )
        } else
          return (
            <Typography
              key={index}
              variant={variant ? variant : 'body2'}
              fontWeight={reprops.fontWeight}
              component={reprops.component}
              {...props}
            >
              {reprops.text === `\n` ? (
                <br></br>
              ) : reprops.text ? (
                reprops.text
              ) : (
                ' '
              )}
            </Typography>
          )
      })}
    </>
  )
}

function areEqual(prevProps: TextProps, nextProps: TextProps) {
  return (
    isEqual(prevProps.block, nextProps.block) &&
    isEqual(prevProps.component, nextProps.component) &&
    isEqual(prevProps.variant, nextProps.variant)
  )
}
export default memo(Text, areEqual)
