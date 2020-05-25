import * as admin from 'firebase-admin'

import { isBrowser } from '@/utils/isBrowser'

if (!admin.apps.length && !isBrowser) {
  const firebasePrivateKey = String(process.env.FIREBASE_PRIVATE_KEY)

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      // https://stackoverflow.com/a/41044630/1332513
      privateKey: firebasePrivateKey.replace(/\\n/g, '\n'),
    }),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  })
}

export const firestore = admin.firestore()

export default admin
