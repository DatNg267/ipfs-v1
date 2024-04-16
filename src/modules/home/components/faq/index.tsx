import { colorTheme } from '@/themes/_color'
import { Box, List, Stack } from '@mui/material'
import { useState } from 'react'
import { FAQ_CONTENTS } from './data'
import FaqPannel from './pannel'
import Question from './question'

type Props = {}

const Faq = (props: Props) => {
  const [open, setOpen] = useState(0)
  const [arrColor, setArrColor] = useState(colorTheme.general.dotMint)
  const handleChangeColor = (value: any) => setArrColor(value)
  const handleOpen = (index: number) => {
    setOpen(index)
    handleChangeColor(FAQ_CONTENTS[index].arrColor)
  }

  return (
    <Stack direction={{ xs: 'column', md: 'row' }} spacing={8}>
      <FaqPannel arrColor={arrColor} />
      <Box
        flex={1}
        sx={{
          minHeight: { xs: '100%', md: '437px' },
        }}
      >
        <List
          disablePadding
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            minHeight: '400px',
          }}
        >
          {FAQ_CONTENTS.map((faq, index) => (
            <Question
              open={open === index}
              handleOpen={handleOpen}
              index={index}
              key={index}
              {...faq}
            />
          ))}
        </List>
      </Box>
    </Stack>
  )
}

export default Faq
