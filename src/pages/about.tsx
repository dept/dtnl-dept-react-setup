import { NextPage } from 'next'
import React from 'react'

interface PageProps {}

const Page: NextPage<PageProps> = () => {
  return <div>About</div>
}

Page.getInitialProps = async () => {
  return {}
}

export default Page
