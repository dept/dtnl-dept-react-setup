import { NextPage } from 'next'
import React from 'react'

interface PageProps {
  postId: string
}

const Page: NextPage<PageProps> = ({ postId }) => {
  return <div>Blog post with id {postId}</div>
}

Page.getInitialProps = async ctx => {
  return {
    postId: ctx.query.postId as string,
  }
}

export default Page
