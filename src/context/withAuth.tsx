import { NextComponentType, NextPage, NextPageContext } from 'next'
import React, { useEffect, useState } from 'react'

import { useAuth } from './AuthContext'

export default function withAuth() {
  return (AuthComponent: NextComponentType<any>) => {
    const Authenticated: NextPage = props => {
      const { user } = useAuth()
      const [loading, setLoading] = useState(!user)
      const [error, setError] = useState(false)

      async function initialize() {
        setLoading(false)
        setError(false)
      }

      useEffect(() => {
        initialize()
      }, [])

      if (loading) {
        return <div>Loading</div>
      }

      if (error || !user) {
        return <div>Error</div>
      }

      return <AuthComponent {...props} />
    }

    Authenticated.getInitialProps = async (ctx: NextPageContext) => {
      const pageProps = AuthComponent.getInitialProps && (await AuthComponent.getInitialProps(ctx))

      return { ...pageProps }
    }

    return Authenticated
  }
}
