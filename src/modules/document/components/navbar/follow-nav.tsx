import { Box, Stack, useMediaQuery, useTheme } from '@mui/material'
import React, { useContext } from 'react'
import { renderLevel } from './nav-child-item'
import Link from 'next/link'
import {
  ListItemButtonChildrenStyled,
  ListItemIconChildrenStyled,
  ListItemTextChilrenStyled,
} from './styled'
import { SvgIconCustomized } from '@/components/atoms/svg-icon'
import { DocumentContext } from '../../page'
import { toKebabCase } from '@/utils/tools'
import { Icons } from '@/themes/_icons'
import { breakpoints } from '@/themes/_theme'
import { handleToggleNavbar } from '@/layouts/document/services'

type Props = {
  level: number
  objColor: any
  followNavBaseHref?: string
}

const FollowNav = ({ followNavBaseHref, level, objColor }: Props) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const {
    contentTarget,
    handleUpdateContentTarget,
    treeContentConceptIpfsStorage,
  } = useContext(DocumentContext)
  return (
    <Box>
      <>
        {treeContentConceptIpfsStorage?.map((item, index) => (
          <Link
            href={`${followNavBaseHref}#${toKebabCase(item.text)}`}
            passHref
            key={index}
          >
            <ListItemButtonChildrenStyled
              className={
                contentTarget === toKebabCase(item.text) ? 'selected' : ''
              }
              sx={{
                marginBottom: '0px',
                ml: renderLevel(level),
              }}
            >
              <Stack
                direction={'row'}
                flex={1}
                onClick={(e) => {
                  if (isMobile) {
                    handleToggleNavbar()
                  }
                }}
              >
                <ListItemIconChildrenStyled>
                  <Box
                    sx={{
                      width: '12px',
                      height: '12px',
                      border: '1px solid',
                      borderRadius: '99px',
                    }}
                  />
                </ListItemIconChildrenStyled>

                <ListItemTextChilrenStyled primary={item.text} />
              </Stack>
            </ListItemButtonChildrenStyled>
          </Link>
        ))}
      </>
    </Box>
  )
}

export default FollowNav
