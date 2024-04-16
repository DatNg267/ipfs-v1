import { SvgIconCustomized } from '@/components/atoms/svg-icon'
import CopyClipboardText from '@/components/molecules/copy-text'
import { Icons } from '@/themes/_icons'
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material'
import { useContext } from 'react'
import { GatewaysPageContext } from '../resources/context'

const TableGateways = () => {
  const { gateways, subcribe, handleChangeSpeedMonitor } =
    useContext(GatewaysPageContext)
  return (
    <Table
      sx={{
        borderCollapse: 'unset',
        '& .MuiTableCell-root': {
          borderTop: '1px solid',
          borderLeft: '1px solid',
        },
        '& tr:first-of-type td:first-of-type': {
          borderTopLeftRadius: '8px',
        },
        '& tr:last-child td:first-of-type': {
          borderBottomLeftRadius: '8px',
        },
        '& tr:last-child td:last-child': {
          borderBottomRightRadius: '8px',
        },
        '& tr:last-child td': {
          borderBottom: '1px solid',
        },
        '& tr td:last-child': {
          borderRight: '1px solid',
        },
      }}
    >
      <TableBody>
        {gateways &&
          gateways.map((item, index) => (
            <TableRow
              key={index}
              onMouseOver={(e) => {
                if (item && item.type === 'Dedicated') {
                  handleChangeSpeedMonitor(true)
                } else {
                  handleChangeSpeedMonitor(false)
                }
              }}
              onMouseLeave={(e) => {
                handleChangeSpeedMonitor(false)
              }}
              sx={{
                '&:hover': {
                  backgroundColor: (theme) => theme.palette.primary.dark,
                },
              }}
            >
              <TableCell
                sx={{
                  width: '416px',
                }}
              >
                <Typography variant='body1' fontWeight={600}>
                  {item && item.name}
                </Typography>
                <CopyClipboardText
                  copyText={item ? item.host : ''}
                  showText={item ? item.host : ''}
                  typoProps={{
                    variant: 'body2',
                    fontWeight: 500,
                    sx: {
                      textDecoration: 'underline',
                    },
                  }}
                ></CopyClipboardText>
              </TableCell>
              <TableCell sx={{ width: '480px', textAlign: 'center' }}>
                {item && item.active && item.type === 'Public' ? (
                  <SvgIconCustomized component={Icons.CircleCheckFilled} />
                ) : (
                  <></>
                  // <SvgIconCustomized component={Icons.CircleUnCheck} />
                )}
              </TableCell>
              <TableCell sx={{ width: '480px', textAlign: 'center' }}>
                {subcribe ? (
                  <SvgIconCustomized component={Icons.CircleCheckFilled} />
                ) : item &&
                  item.active &&
                  item.type === 'Dedicated' &&
                  subcribe ? (
                  <SvgIconCustomized component={Icons.CircleCheckFilled} />
                ) : (
                  <SvgIconCustomized component={Icons.CircleUnCheck} />
                )}
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  )
}

export default TableGateways
