import { GetStaticProps, NextPage } from 'next'
import { NextSeo } from 'next-seo'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import { useLocalForm } from 'tinacms'

import { Box, Heading, Paragraph } from '@/components/atoms'
import { config } from '@/utils/config'

const { ENVIRONMENT_NAME } = config

interface PageProps {
  initialValues: typeof import('@/data/homepage.json')
}

export const getStaticProps: GetStaticProps = async ctx => {
  const data = await import('@/data/homepage.json')

  return {
    props: {
      fileRelativePath: '/src/data/homepage.json',
      initialValues: data.default,
    },
  }
}

const Page: NextPage<PageProps> = ({ initialValues }) => {
  const [values] = useLocalForm({
    id: 'homepage',
    initialValues,
    label: 'Edit homepage',
    fields: [
      {
        name: 'title',
        label: 'Title',
        component: 'text',
      },
      {
        name: 'content',
        label: 'Content',
        component: 'markdown',
      },
    ],
    onSubmit: (values, form) => {
      console.log(values, form)
    },
  })

  return (
    <>
      <NextSeo title="Homepage" description="This is the homepage" />
      <Box>
        <Heading as="h1" color="primary">
          {values.title}
        </Heading>

        <ReactMarkdown source={values.content}></ReactMarkdown>

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
