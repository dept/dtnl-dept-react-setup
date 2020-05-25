import { firestore } from '@lib/firebase/firebaseAdmin'
import { GetStaticProps, NextPage } from 'next'
import { NextSeo } from 'next-seo'
import React from 'react'

import { Box, Heading, Paragraph } from '@/components/atoms'
import { config } from '@/utils/config'

const { ENVIRONMENT_NAME } = config

interface PageProps {}

export const getStaticProps: GetStaticProps = async () => {
  const doc = await firestore.doc('/environment/test/pages/homepage').get()

  const data = doc.data()

  if (!data) {
    await doc.ref.create({
      slug: '',
      title: 'Homepage',
    })
  }

  console.log({
    doc,
    data: doc.data(),
  })

  return {
    props: {},
  }
}

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
      </Box>
    </>
  )
}

export default Page
