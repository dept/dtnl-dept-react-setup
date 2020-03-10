---
to: src/pages/<%= name %>.tsx
---
<% classified = h.inflection.classify(name) -%>
import { NextPage, NextPageContext } from 'next'
import { NextSeo } from 'next-seo'
import React from 'react'

interface PageProps {}

<% if(componentType === 'f'){ -%>
const Page: NextPage<PageProps> = (props) => {
  return (
    <>
      <NextSeo title="Page title" description="Page description" />
      <div><%= name %></div>
    </>
  )
}

/**
 * Used to fetch initial data on the server side. Remove if not needed to allow for Automatic Static Optimization
 * https://nextjs.org/docs/api-reference/data-fetching/getInitialProps
 * https://nextjs.org/docs/advanced-features/automatic-static-optimization
 */
Page.getInitialProps = async (ctx: NextPageContext) => {
  return {}
}

export default Page
<% } -%>
<% if(componentType === 'c'){ -%>
export default class Page extends React.Component<PageProps> {
  /**
  * Used to fetch initial data on the server side. Remove if not needed to allow for Automatic Static Optimization
  * https://nextjs.org/docs/api-reference/data-fetching/getInitialProps
  * https://nextjs.org/docs/advanced-features/automatic-static-optimization
  */
  static getInitialProps = async (ctx: NextPageContext) => {
    return {}
  }

  render() {
    return (
      <>
        <NextSeo title="Page title" description="Page description" />
        <div><%= name %></div>
      </>
    )
  }
}

<% } -%>


