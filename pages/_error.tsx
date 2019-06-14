import { NextContext } from 'next'
import React from 'react'

interface ErrorProps {
  statusCode: number | null
}

class MyError extends React.Component<ErrorProps> {
  static getInitialProps({ res, err }: NextContext) {
    // @ts-ignore
    const statusCode = res ? res.statusCode : err ? err.statusCode : null
    return { statusCode }
  }

  render() {
    return <div>There was an error</div>
  }
}

export default MyError
