---
to: src/components/atoms/<%= name %>.tsx
---
<% classified = h.inflection.classify(name) -%>
import React from 'react'

export interface <%= classified %>Props {}

<% if(componentType === 'f'){ -%>
export const <%= classified %>: React.FC<<%= classified %>Props> = () => {
  return <div></div>
}
<% } -%>
<% if(componentType === 'c'){ -%>
export class <%= classified %> extends React.Component<<%= classified %>Props> {
  render() {
    return <div></div>
  }
}
<% } -%>


