import { Box, Heading } from '@tpdewolf/styled-primitives'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import React from 'react'

import { Hyperlink, Link } from '@/components/atoms'

interface PageProps {}

export interface BlogPost {
  id: number
  title: string
  content: string
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Example blog post',
    content: 'Awesome content',
  },
  {
    id: 2,
    title: 'Another example blog post',
    content: 'More awesome content',
  },
]

const Page: NextPage<PageProps> = () => {
  return (
    <>
      <NextSeo title="Blog" />
      <Box>
        <Heading as="h1" color="primary">
          Blogs
        </Heading>
        <ul>
          {blogPosts.map(item => {
            return (
              <li key={item.id}>
                <Link href="/blog/[postId]" as={`/blog/${item.id}`}>
                  <Hyperlink>{item.title}</Hyperlink>
                </Link>
              </li>
            )
          })}
        </ul>
      </Box>
    </>
  )
}

Page.getInitialProps = async () => {
  return {}
}

export default Page
