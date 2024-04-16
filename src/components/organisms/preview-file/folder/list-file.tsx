import { List, ListItem, Stack } from '@mui/material'
import React from 'react'
import ListFileItem from './list-file-item'
import { IPFSGetFolderResponse } from '@/apis/ipfs/type'
import { CodeScrollBarStyled } from '@/themes/_theme'

type Props = {
  listFile?: IPFSGetFolderResponse['Links']
  handlePreviewFile: (index: number) => void
  [key: string]: any
}

const ListFile = ({ listFile, handlePreviewFile, ...props }: Props) => {
  return (
    <Stack
      flex={1}
      {...props}
      sx={{
        padding: 2,
        border: '1px solid',
        borderColor: (theme) => theme.palette.baseGray[800],
        borderRadius: '8px',
        overflowY: 'auto',
        overflowX: 'hidden',
        ...CodeScrollBarStyled,
        ...(props && props.sx),
      }}
    >
      <List disablePadding>
        {listFile &&
          listFile.map((file, index) => (
            <ListFileItem
              onClick={() => handlePreviewFile(index)}
              key={index}
              name={file.Name}
              size={file.Tsize}
              hash={file.Hash['/']}
            />
          ))}
        {!listFile && (
          <>
            <ListFileItem />
            <ListFileItem />
            <ListFileItem />
            <ListFileItem />
            <ListFileItem />
          </>
        )}
      </List>
    </Stack>
  )
}

export default ListFile
