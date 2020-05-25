import { HttpClient } from './Http'

class FirestoreClient {
  client: HttpClient

  constructor() {
    this.client = new HttpClient({
      baseUrl: '/api',
    })
  }

  updateDocument = (data: any) => this.client.put('/firestore', data)
  createDocument = (data: any) => this.client.post('/firestore', data)
  removeDocument = (data: any) => this.client.delete('/firestore', data)
}

export const firestoreClient = new FirestoreClient()
