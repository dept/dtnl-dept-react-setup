import { Box, Heading, Text } from '@tpdewolf/styled-primitives'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import React from 'react'

interface PageProps {}

const Page: NextPage<PageProps> = () => {
  return (
    <>
      <NextSeo title="Homepage" />
      <Box>
        <Heading as="h1" color="primary">
          Homepage
        </Heading>
        <Text as="p">Run `yarn storybook`</Text>
      </Box>
    </>
  )
}

Page.getInitialProps = async () => {
  return {}
}

export default Page
