import { NextPageContext } from 'next'
import React from 'react'

import { ErrorPage, NotFoundPage } from '@/components/templates'

interface ErrorProps {
  statusCode: number | null
}

class MyError extends React.Component<ErrorProps> {
  static getInitialProps({ res, err }: NextPageContext) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null
    return { statusCode }
  }

  render() {
    switch (this.props.statusCode) {
      case 404:
        return <NotFoundPage />
      default:
        return <ErrorPage />
    }
  }
}

export default MyError
