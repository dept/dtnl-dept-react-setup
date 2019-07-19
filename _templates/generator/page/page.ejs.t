---
to: pages/<%= name %>.tsx
---
<% classified = h.inflection.classify(name) -%>
import { NextPage, NextPageContext } from 'next'
import React from 'react'

interface PageProps {}

<% if(componentType === 'f'){ -%>
const Page: NextPage<PageProps> = (props) => {
  return <div></div>
}

Page.getInitialProps = async (ctx: NextPageContext) => {
  return {}
}

export default Page
<% } -%>
<% if(componentType === 'c'){ -%>
export default class Page extends React.Component<PageProps> {
  static getInitialProps = async (ctx: NextPageContext) => {
    return {}
  }

  render() {
    return <div />
  }
}

<% } -%>


