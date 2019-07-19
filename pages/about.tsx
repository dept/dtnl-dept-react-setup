import { NextPage } from 'next'
import React from 'react'

import { BaseLayout } from '@/components/templates'

interface PageProps {}

const Page: NextPage<PageProps> = () => {
  return <BaseLayout>About</BaseLayout>
}

Page.getInitialProps = async () => {
  return {}
}

export default Page
