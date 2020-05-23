import { GetStaticProps, NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { JsonFile, useLocalJsonForm } from 'next-tinacms-json'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import { InlineForm, InlineTextField, InlineWysiwyg } from 'react-tinacms-inline'

import { Box, Heading } from '@/components/atoms'
import { InlineButtons } from '@/components/organisms/Cms/InlineButtons'
import { cloudinaryStore } from '@/services/cloudinary'
import { config } from '@/utils/config'

const { ENVIRONMENT_NAME } = config

interface PageProps {
  data: JsonFile
}

export const getStaticProps: GetStaticProps<PageProps> = async ctx => {
  const json = await import('@/data/homepage.json')

  return {
    props: {
      data: {
        fileRelativePath: '/src/data/homepage.json',
        data: json.default,
      },
    },
  }
}

const Page: NextPage<PageProps> = ({ data }) => {
  const [values, form] = useLocalJsonForm(data, {
    label: 'Homepage',
    fields: [
      {
        name: 'title',
        label: 'Title',
        component: 'text',
      },
      {
        name: 'image',
        label: 'Image',
        component: 'image',
        ...cloudinaryStore.getFieldProps(),
      },
      {
        name: 'content',
        label: 'Content',
        component: 'markdown',
      },
    ],
  })

  return (
    <InlineForm form={form}>
      <NextSeo title="Homepage" description="This is the homepage" />
      <Box>
        <Heading as="h1" color="primary">
          <InlineTextField name="title" />
        </Heading>

        <InlineWysiwyg name="content">
          <ReactMarkdown source={values.content}></ReactMarkdown>
        </InlineWysiwyg>

        {ENVIRONMENT_NAME && <code>Running on environment: {ENVIRONMENT_NAME}</code>}
      </Box>

      <InlineButtons />
    </InlineForm>
  )
}

export default Page
