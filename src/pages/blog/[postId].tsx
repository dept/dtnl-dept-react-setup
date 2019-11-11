import { Box, Heading, Text } from '@tpdewolf/styled-primitives'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import React from 'react'

import { Hyperlink } from '@/components/atoms'

import { BlogPost, blogPosts } from '.'

interface PageProps {
  post: BlogPost
}

const Page: NextPage<PageProps> = ({ post }) => {
  return (
    <>
      <NextSeo title={post.title} description={post.content} />
      <Box>
        <Heading as="h1" color="primary">
          {post.title}
        </Heading>
        <Text as="p">{post.content}</Text>

        <Hyperlink href="/blog">Go back</Hyperlink>
      </Box>
    </>
  )
}

Page.getInitialProps = async ctx => {
  const post = blogPosts.find(item => item.id === Number(ctx.query.postId))

  if (!post) {
    if (ctx.res) {
      ctx.res.statusCode = 404
    }

    throw new Error('Post not found')
  }

  return {
    post,
  }
}

export default Page
