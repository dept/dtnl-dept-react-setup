import { NextPage } from 'next'
import React from 'react'

import { BaseLayout } from '@/components/templates'

interface PageProps {
  postId: string
}

const Page: NextPage<PageProps> = ({ postId }) => {
  return <BaseLayout>Blog post with id {postId}</BaseLayout>
}

Page.getInitialProps = async ctx => {
  return {
    postId: ctx.query.postId as string,
  }
}

export default Page
