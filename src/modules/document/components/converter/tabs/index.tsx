import { Stack } from '@mui/material'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import { isEqual } from 'lodash'
import * as React from 'react'
import { DocumentTabs } from './types'
import CodeBlock from '../code'
interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <Box
      role='tabpanel'
      // hidden={value !== index}
      {...other}
      sx={{
        ...(value !== index && {
          width: '0px',
          height: '0px',
          visible: 'hidden',
        }),
        ...(value === index && {
          width: 'auto',
          height: 'auto',
          visible: 'visible',
        }),
        marginTop: '0px',
        borderRadius: '10px',
        borderTopLeftRadius: '0px',
        overflow: 'hidden',
        '& pre': {
          borderRadius: '0px !important',
        },
      }}
    >
      {children}
    </Box>
  )
}

type Props = {
  tabsBlock: DocumentTabs
}

const TabsBlock = ({ tabsBlock }: Props) => {
  const [value, setValue] = React.useState(0)
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }
  const itemList = tabsBlock.nodes.map((node, index) => node.data.title)
  return (
    <Box
      sx={{
        overflow: 'hidden',
      }}
    >
      <Stack>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='basic tabs example'
          sx={{
            '& .MuiTabs-flexContainer': {
              width: 'fit-content',
              backgroundColor: (theme) => theme.palette.baseGray[800],
              borderTopLeftRadius: '10px',
              borderTopRightRadius: '10px',
              border: '1px solid black',
              borderBottom: 'none',
              overflow: 'hidden',
            },
            '& .MuiTab-root': {
              borderRadius: 0,
              color: 'primary.main',
            },
            '& .MuiTabs-indicator': {
              display: 'none',
            },
            '& .MuiTab-root.Mui-selected': {
              borderBottom: 'none',
              color: 'primary.main',
              backgroundColor: (theme) => theme.palette.baseGray[1000],
            },
          }}
          variant='scrollable'
          scrollButtons='auto'
        >
          {itemList.map((item, index) => (
            <Tab key={index} label={item} />
          ))}
        </Tabs>
      </Stack>
      <Box
        sx={{
          overflow: 'hidden',
          borderTopLeftRadius: '0px',
        }}
      >
        {tabsBlock.nodes.map((node, index) => (
          <TabPanel value={value} index={index} key={index}>
            <CodeBlock codeBlock={node.nodes[0]} />
          </TabPanel>
        ))}
      </Box>
    </Box>
  )
}

function areEqual(prevProps: Props, nextProps: Props) {
  return isEqual(prevProps.tabsBlock, nextProps.tabsBlock)
}
export default React.memo(TabsBlock, areEqual)
