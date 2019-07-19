import { NextPage, NextPageContext } from 'next'
import React from 'react'

import { BaseLayout } from '../src/components/templates/BaseLayout'

interface PageProps {
  productId: string
}

const Page: NextPage<PageProps> = ({ productId }) => {
  return <BaseLayout>Page for product {productId}</BaseLayout>
}

Page.getInitialProps = async (ctx: NextPageContext) => {
  const productId = ctx.query.productId as string

  if (!productId) {
    throw new Error('No product ID was supplied')
  }

  return {
    productId,
  }
}

export default Page
