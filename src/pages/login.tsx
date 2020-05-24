import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import Router from 'next/router'
import React, { useEffect } from 'react'

import { Button } from '@/components/atoms'
import { useUser } from '@/context/UserContext'

interface PageProps {}

const Page: NextPage<PageProps> = () => {
  const { user, login } = useUser()

  useEffect(() => {
    if (user) {
      Router.push('/')
    }
  }, [user])

  return (
    <>
      <NextSeo title="Log in" description="Log in with Google" />
      <Button onClick={login}>Log in with Google</Button>
    </>
  )
}

export default Page
