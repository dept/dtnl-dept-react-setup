---
to: pages/<%= name %>.tsx
---
<% classified = h.inflection.classify(name) -%>
import { NextContext, NextFC } from 'next'
import React from 'react'

interface PageProps {}

<% if(componentType === 'f'){ -%>
const Page: NextFC<PageProps> = (props) => {
  return <div></div>
}

Page.getInitialProps = async (ctx: NextContext) => {
  return {}
}

export default Page
<% } -%>
<% if(componentType === 'c'){ -%>
export default class Page extends React.Component<PageProps> {
  static getInitialProps = async (ctx: NextContext) => {
    return {}
  }

  render() {
    return <div />
  }
}

<% } -%>


