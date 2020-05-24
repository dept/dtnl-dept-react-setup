import { useDatabaseLocalForm } from '@packages/next-tinacms-db/useDatabaseLocalForm'
import { db } from '@server/mongo'
import { GetStaticProps, NextPage } from 'next'
import { NextSeo } from 'next-seo'
import ReactMarkdown from 'react-markdown'
import { InlineForm, InlineTextField, InlineWysiwyg } from 'react-tinacms-inline'

import { Box, Heading } from '@/components/atoms'
import { InlineButtons } from '@/components/organisms/Cms/InlineButtons'
import { cloudinaryStore } from '@/services/cloudinary'
import { config } from '@/utils/config'

const { ENVIRONMENT_NAME } = config

interface PageProps {
  data: any
}

export const getStaticProps: GetStaticProps = async ctx => {
  const data = await db.getDocument({
    slug: 'homepage',
  })

  return {
    props: {
      data,
    },
  }
}

const Page: NextPage<PageProps> = ({ data }) => {
  const [values, form] = useDatabaseLocalForm(data, {
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
        ...cloudinaryStore.getFieldProps('image'),
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
