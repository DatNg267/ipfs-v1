import { SvgIconCustomized } from '@/components/atoms/svg-icon'
import CopyClipboardText from '@/components/molecules/copy-text'
import { Icons } from '@/themes/_icons'
import { Gateways } from '@/types/gateways'
import {
  Box,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  styled,
} from '@mui/material'
import DedicatedPlan from './dedicated-plan'
import PublicPlan from './public-plan'

type Props = {
  subsribed: boolean
  gateways: Gateways | null
}
const TableStyled = styled(Table)(({ theme }) => ({
  borderCollapse: 'separate',
  '& tr td': {
    borderBottom: 'none',
    padding: '4px 16px',
  },
  '& tr:last-child td': {
    borderBottom: '1px solid',
    borderColor: 'border.dark',
    borderBottomLeftRadius: '8px',
    borderBottomRightRadius: '8px',
  },
}))
const GatewayStyledMobile = ({ subsribed, gateways }: Props) => {
  return (
    <Stack flex={1}>
      <Paper
        sx={{
          padding: { xs: 2 },
        }}
      >
        <Paper
          sx={{
            m: { xs: 0 },
            backgroundColor: 'background.default',
            color: 'primary.main',
            p: { xs: 4 },
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          }}
        >
          <DedicatedPlan />
        </Paper>
        <TableStyled>
          <TableBody>
            {gateways &&
              gateways.map(
                (gateway, index) =>
                  gateway &&
                  gateway.active &&
                  gateway.type === 'Dedicated' && (
                    <TableRow key={index} sx={{}}>
                      <TableCell
                        sx={{ border: '1px solid', borderColor: 'border.dark' }}
                      >
                        <Stack
                          direction={'row'}
                          justifyContent={'space-between'}
                          spacing={2}
                        >
                          <Box>
                            <Typography variant='body1' fontWeight={600}>
                              {gateway && gateway.name}
                            </Typography>
                            <CopyClipboardText
                              copyText={gateway ? gateway.host : ''}
                              showText={gateway ? gateway.host : ''}
                              typoProps={{
                                variant: 'body2',
                                fontWeight: 500,
                                sx: {
                                  textDecoration: 'underline',
                                },
                              }}
                            ></CopyClipboardText>
                          </Box>
                          <Stack justifyContent={'center'}>
                            {subsribed ? (
                              <SvgIconCustomized
                                component={Icons.CircleCheckFilled}
                              />
                            ) : (
                              <SvgIconCustomized
                                component={Icons.CircleUnCheck}
                              />
                            )}
                          </Stack>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  )
              )}
          </TableBody>
        </TableStyled>
      </Paper>
      <Paper
        sx={{
          p: { xs: 2 },
          flex: 1,
        }}
      >
        <Paper
          sx={{
            m: { xs: 0 },
            border: '1px solid',
            borderColor: 'border.dark',
            padding: { xs: '8px' },
            backgroundColor: 'transparent',
            borderBottomLeftRadius: '0px',
            borderBottomRightRadius: '0px',
            borderBottom: 'none',
            boxShadow: 'none',
          }}
        >
          <PublicPlan />
        </Paper>

        <TableStyled>
          <TableBody>
            {gateways &&
              gateways.map(
                (gateway, index) =>
                  gateway &&
                  gateway.active &&
                  gateway.type === 'Public' && (
                    <TableRow key={index} sx={{}}>
                      <TableCell
                        sx={{ border: '1px solid', borderColor: 'border.dark' }}
                      >
                        <Stack
                          direction={'row'}
                          justifyContent={'space-between'}
                          spacing={2}
                        >
                          <Box>
                            <Typography variant='body1' fontWeight={600}>
                              {gateway && gateway.name}
                            </Typography>
                            <CopyClipboardText
                              copyText={gateway ? gateway.host : ''}
                              showText={gateway ? gateway.host : ''}
                              typoProps={{
                                variant: 'body2',
                                fontWeight: 500,
                                sx: {
                                  textDecoration: 'underline',
                                },
                              }}
                            ></CopyClipboardText>
                          </Box>
                          <Stack justifyContent={'center'}>
                            <SvgIconCustomized
                              component={Icons.CircleCheckFilled}
                            />
                          </Stack>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  )
              )}
          </TableBody>
        </TableStyled>
      </Paper>
    </Stack>
  )
}

export default GatewayStyledMobile
