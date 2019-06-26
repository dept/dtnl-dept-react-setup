import { NextFC } from 'next'
import React from 'react'

import { BaseLayout } from '@/components/templates'

interface PageProps {}

const Page: NextFC<PageProps> = () => {
  return <BaseLayout>About</BaseLayout>
}

export default Page
