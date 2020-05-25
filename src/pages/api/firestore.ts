import { firestore } from '@lib/firebase/firebaseAdmin'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function firestoreRequest(req: NextApiRequest, res: NextApiResponse) {
  const { slug: documentPath, formData } = req.body

  try {
    switch (req.method) {
      case 'POST':
        await firestore.doc(documentPath).create(formData)
        res.status(201).end()
        break
      case 'PUT':
        await firestore.doc(documentPath).update(formData)
        res.status(204).end()
        break
      case 'DELETE':
        await firestore.doc(documentPath).delete()
        res.status(204).end()
        break
      default:
        res.status(500).end('Method not allowed')
        break
    }
  } catch (err) {
    console.error(err)
    res.status(500).end()
  }

  res.end('Hello World')
}
