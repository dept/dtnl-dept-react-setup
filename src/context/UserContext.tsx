import firebase from '@lib/firebase/firebaseClient'
import React, { useContext, useEffect, useState } from 'react'
import { Cookies } from 'react-cookie'

interface UserStore {
  user: firebase.User | null
  setUser: (user: firebase.User | null) => void
  isLoading: boolean
  login: () => void
}

const googleProvider = new firebase.auth.GoogleAuthProvider()

const cookies = new Cookies()

export const UserContext = React.createContext({} as UserStore)

export const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<firebase.User | null>(null)
  const [isLoading, setLoading] = useState(true) // Helpful, to update the UI accordingly.

  useEffect(() => {
    // Listen authenticated user
    const unsubscriber = firebase.auth().onAuthStateChanged(async user => {
      try {
        if (user) {
          // User is signed in.
          console.log({ user })

          const idToken = await user.getIdToken()

          cookies.set('idToken', idToken)
          // You could also look for the user doc in your Firestore (if you have one):
          // const userDoc = await firebase.firestore().doc(`users/${uid}`).get()
          setUser(user)
        } else {
          setUser(null)
        }
      } catch (error) {
        // Most probably a connection error. Handle appropiately.
      } finally {
        setLoading(false)
      }
    })

    // Unsubscribe auth listener on unmount
    return () => unsubscriber()
  }, [])

  function login() {
    firebase.auth().signInWithPopup(googleProvider)
  }

  return (
    <UserContext.Provider value={{ user, setUser, isLoading, login }}>
      {children}
    </UserContext.Provider>
  )
}

// Custom hook that shorhands the context!
export const useUser = (): UserStore => {
  return useContext(UserContext)
}
