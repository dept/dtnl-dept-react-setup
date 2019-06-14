---
to: src/context/<%= name %>Context.tsx
---
<% classified = h.inflection.classify(name) -%>
import React, { useContext } from 'react'

export interface <%= classified %>ContextStore {}

export const <%= classified %>Context = React.createContext({} as <%= classified %>ContextStore)
export const <%= classified %>ContextConsumer = <%= classified %>Context.Consumer
export const use<%= classified %> = () => useContext(<%= classified %>Context)

// add <%= classified %>ContextProvider to ContextProvider
<% if(componentType === 'f'){ -%>
export const <%= classified %>ContextProvider: React.FC = props => {
  const store: <%= classified %>ContextStore = {}

  return <<%= classified %>Context.Provider {...props} value={store} />
}
<% } -%>
<% if(componentType === 'c'){ -%>
export class <%= classified %>ContextProvider extends React.Component {
  public render() {
    const store: <%= classified %>ContextStore = {}
    return <<%= classified %>Context.Provider {...props} value={store} />
  }
}
<% } -%>


