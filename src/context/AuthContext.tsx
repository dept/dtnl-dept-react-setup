import React, { useContext, useMemo, useState } from 'react'

export interface AuthContextStore {
  login: () => void
  logout: () => void
  user: UserModel | undefined
}

interface UserModel {
  name: string
  email: string
}

export const AuthContext = React.createContext({} as AuthContextStore)
export const AuthConsumer = AuthContext.Consumer
export const useAuth = () => useContext(AuthContext)

export const AuthContextProvider: React.FC = props => {
  const [user, setUser] = useState<UserModel>()

  function login() {
    setUser({
      name: 'John Smith',
      email: 'john@deptagency.com',
    })
  }

  function logout() {
    setUser(undefined)
  }

  const store: AuthContextStore = useMemo(() => {
    return {
      logout,
      user,
      login,
    }
  }, [user])

  return <AuthContext.Provider {...props} value={store} />
}
