import { NextComponentType, NextContext, NextFC } from 'next'
import React, { useEffect, useState } from 'react'

import { useAuth } from './AuthContext'

export default function withAuth() {
  return (AuthComponent: NextComponentType<any>) => {
    const Authenticated: NextFC = props => {
      const [loading, setLoading] = useState(true)
      const [error, setError] = useState(false)
      const { user } = useAuth()

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

    Authenticated.getInitialProps = async (ctx: NextContext<{}>) => {
      const pageProps = AuthComponent.getInitialProps && (await AuthComponent.getInitialProps(ctx))
      return { ...pageProps }
    }

    return Authenticated
  }
}
