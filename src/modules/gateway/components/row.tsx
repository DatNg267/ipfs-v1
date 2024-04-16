import CopyClipboardText from '@/components/molecules/copy-text'
import { SvgIconCustomized } from '@/components/atoms/svg-icon'
import {
  TableCellStyled,
  TableLoadingCellStyled,
  TableNullCellStyled,
} from '@/components/organisms/table/cell'
import { Icons } from '@/themes/_icons'
import { Stack, Typography } from '@mui/material'
import { GatewayRow } from '../resources/types'
import { useContext } from 'react'
import { GatewaysPageContext } from '../resources/context'
type CellProps = {
  row?: GatewayRow | null
}

function GateWayRow(props: CellProps) {
  const { subcribe } = useContext(GatewaysPageContext)
  const { row } = props
  if (!row) {
    return (
      <TableNullCellStyled
        component='th'
        scope='row'
        padding='none'
      ></TableNullCellStyled>
    )
  } else
    return (
      <>
        <TableCellStyled
          component='th'
          scope='row'
          padding='none'
          sx={{
            paddingLeft: '28px',
          }}
        >
          <Stack direction={'row'} alignItems={'center'} spacing={2}>
            <Typography variant='body1' fontWeight={'inherit'}>
              {row.name}
            </Typography>
          </Stack>
        </TableCellStyled>
        <TableCellStyled>
          <CopyClipboardText
            typoProps={{ variant: 'body1', fontWeight: 'inherit' }}
            copyText={row.host}
            showText={row.host}
            wrapperProps={{
              justifyContent: 'flex-start',
            }}
          />
        </TableCellStyled>
        <TableCellStyled align='right'>
          <Typography variant='body1' fontWeight={'inherit'}>
            {row.type}
          </Typography>
        </TableCellStyled>

        <TableCellStyled>
          <Typography variant='body1' fontWeight={'inherit'}>
            {row.operation}
          </Typography>
        </TableCellStyled>
        <TableCellStyled>
          <Typography variant='body1' fontWeight={'inherit'}>
            {row.bandwidth} Mbps
          </Typography>
        </TableCellStyled>

        <TableCellStyled>
          <Stack alignItems={'center'}>
            {(row.active && subcribe && row.type === 'Dedicated') ||
            (row.active && row.type === 'Public') ? (
              <SvgIconCustomized component={Icons.CircleCheckFilled} />
            ) : (
              <SvgIconCustomized component={Icons.CircleUnCheck} />
            )}
          </Stack>
        </TableCellStyled>
      </>
    )
}

export default GateWayRow
