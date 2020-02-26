import { Box, Heading, Paragraph } from '@tpdewolf/styled-primitives'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import React from 'react'

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
        <Paragraph>Run `yarn generate page [name]` to create a page</Paragraph>
        <Paragraph>Run `yarn generate component [name]` to create a component</Paragraph>
      </Box>
    </>
  )
}

export default Page
