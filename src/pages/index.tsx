import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import React from 'react'

import { Box, Heading, Image, Paragraph } from '@/components/atoms'
import { config } from '@/utils/config'

const { ENVIRONMENT_NAME } = config

interface PageProps {}

const Page: NextPage<PageProps> = () => {
  return (
    <>
      <NextSeo title="Homepage" description="This is the homepage" />
      <Box>
        <Heading as="h1" color="primary">
          Homepage
        </Heading>
        <Paragraph>Run `yarn storybook` to view all components</Paragraph>
        <Paragraph>Run `yarn route [name]` to create a page</Paragraph>
        <Paragraph>Run `yarn component [name]` to create a component</Paragraph>
        <Paragraph>Run `yarn context [name]` to create a context provider</Paragraph>

        {ENVIRONMENT_NAME && <code>Running on environment: {ENVIRONMENT_NAME}</code>}

        <Image
          width={400}
          height={300}
          src="https://images.unsplash.com/photo-1590402631291-6d8ec93b441b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
          alt="Test"></Image>
        <Image
          src="https://images.unsplash.com/photo-1590406542983-2823c9c2f71d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1002&q=80"
          alt="Test"></Image>
        <Image
          ratio={9 / 12}
          src="https://images.unsplash.com/photo-1590408728391-da37463d197a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=672&q=80"
          alt="Test"></Image>
        <Image
          src="https://images.unsplash.com/photo-1590404897403-07a414ab0e13?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=658&q=80"
          alt="Test"></Image>
      </Box>
    </>
  )
}

export default Page
