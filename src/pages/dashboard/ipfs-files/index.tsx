import DashboardLayout from '@/layouts/dashboard'
import IpfsFilePageContent from '@/modules/ipfs-files/page'
import React from 'react'

type Props = {}

const IpfsFilePage = (props: Props) => {
  return <IpfsFilePageContent />
}
IpfsFilePage.Layout = DashboardLayout
export default IpfsFilePage
