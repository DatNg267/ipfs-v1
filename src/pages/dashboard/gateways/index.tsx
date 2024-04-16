import DashboardLayout from '@/layouts/dashboard'
import GatewayV2 from '@/modules/gateway/pages/v2'

const GatewaysPage = () => {
  return <GatewayV2 />
}
GatewaysPage.Layout = DashboardLayout
export default GatewaysPage

// export const getStaticProps: GetStaticProps = async (context) => {
//   const gateways = await GatewayApis.getGateways({ offset: 0, limit: 10 })
//     .then((res) => {
//       return res.data.gateways
//     })
//     .catch((err) => {})
//   return {
//     props: {
//       gateways: gateways ? gateways : [],
//     },
//   }
// }
