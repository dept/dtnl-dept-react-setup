import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import React from 'react'

import { Box } from '@/components/atoms'
import { useAuth } from '@/context/AuthContext'
import { withAuth } from '@/utils/withAuth'

interface PageProps {}

const Page: NextPage<PageProps> = () => {
  const { user } = useAuth()

  return (
    <>
      <NextSeo title="Admin" description="Admin area" />
      <Box>Logged in as {user?.name}</Box>
    </>
  )
}

export default withAuth(Page)
