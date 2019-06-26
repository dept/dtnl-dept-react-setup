import { NextContext, NextFC } from 'next'
import React from 'react'

import { BaseLayout } from '../src/components/templates/BaseLayout'

interface PageProps {
  productId: string
}

const Page: NextFC<PageProps> = ({ productId }) => {
  return <BaseLayout>Page for product {productId}</BaseLayout>
}

Page.getInitialProps = async (ctx: NextContext) => {
  const productId = ctx.query.productId as string

  if (!productId) {
    throw new Error('No product ID was supplied')
  }

  return {
    productId,
  }
}

export default Page
