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
export const <%= classified %>ContextProvider: React.FC = ({children}) => {
  const store: <%= classified %>ContextStore = {}

  return <<%= classified %>Context.Provider value={store}>{children}</<%= classified %>Context.Provider>
}
<% } -%>
<% if(componentType === 'c'){ -%>
export class <%= classified %>ContextProvider extends React.Component {
  public render() {
    const { children } = this.props
    const store: <%= classified %>ContextStore = {}
    return <<%= classified %>Context.Provider value={store}>{children}</<%= classified %>Context.Provider>
  }
}
<% } -%>


