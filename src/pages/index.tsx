import { firestore } from '@lib/firebase/firebaseAdmin'
import { useDatabaseLocalForm } from '@packages/next-tinacms-db/useDatabaseLocalForm'
import { usePageCreatorPlugin } from '@packages/next-tinacms-db/usePageCreatorPlugin'
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

export const getStaticProps: GetStaticProps = async () => {
  const documentPath = '/environment/test/pages/homepage'
  const defaultFields = {
    title: 'Homepage',
  }

  const doc = await firestore.doc(documentPath).get()

  const data = doc.data()

  if (!data) {
    await doc.ref.create({
      title: 'Homepage',
    })
  }

  return {
    props: {
      data: {
        slug: documentPath,
        fields: doc.data() || defaultFields,
      },
    },
  }
}

const Page: NextPage<PageProps> = ({ data }) => {
  usePageCreatorPlugin()
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
