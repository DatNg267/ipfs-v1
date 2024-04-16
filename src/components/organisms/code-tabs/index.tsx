import CodeExample from '@/components/organisms/code-example'
import { breakpoints } from '@/themes/_theme'
import { Paper, Stack } from '@mui/material'
import React, { useEffect } from 'react'
import ResultPreviewMainHeading from '../preview-file/components/main-heading'

type Props = {
  codeStringLeft: string
  codeStringRight: string
  labelLeft?: string
  labelRight?: string
  overrideTabIndex?: number
  overrideChangeMainTabIndex?: (
    e: React.SyntheticEvent,
    tabIndex: number
  ) => void
}

const CodeTabs = ({
  codeStringLeft,
  codeStringRight,
  labelLeft,
  labelRight,
  overrideChangeMainTabIndex,
  overrideTabIndex,
}: Props) => {
  const [tabIndex, setTabIndex] = React.useState(
    overrideTabIndex ? overrideTabIndex : 0
  )
  useEffect(() => {
    if (overrideTabIndex !== undefined) setTabIndex(overrideTabIndex)
  }, [overrideTabIndex])

  const handleChangeMainTabIndex = overrideChangeMainTabIndex
    ? overrideChangeMainTabIndex
    : (event: React.SyntheticEvent, tabIndex: number) => {
        setTabIndex(tabIndex)
      }

  return (
    <Stack sx={{ height: '100%' }}>
      <ResultPreviewMainHeading
        handleChange={handleChangeMainTabIndex}
        tabIndex={tabIndex}
        labelLeft={labelLeft}
        labelRight={labelRight}
      />
      <Paper
        sx={{
          backgroundColor: 'background.default',
          flex: 1,
          color: 'primary.main',
          p: tabIndex === 1 ? '0px' : '0px',
          [breakpoints.down('md')]: {
            p: tabIndex === 1 ? '0px' : '0px',
          },
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <Stack
          sx={{ display: tabIndex === 1 ? 'flex' : 'none', height: '100%' }}
        >
          <CodeExample codeString={codeStringLeft} />
        </Stack>
        <Stack
          sx={{
            display: tabIndex === 0 ? 'flex' : 'none',
            minHeight: '0px',
            height: '100%',
          }}
          spacing={4}
        >
          <CodeExample codeString={codeStringRight} />
        </Stack>
      </Paper>
    </Stack>
  )
}

export default CodeTabs
