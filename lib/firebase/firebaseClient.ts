import 'firebase/auth'

import firebase from 'firebase/app'

const clientCredentials = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
}

const isBrowser = typeof window !== 'undefined'
export const isInitialized = firebase.apps.length > 0

if (isBrowser && !isInitialized) {
  firebase.initializeApp(clientCredentials)
}

export default firebase
