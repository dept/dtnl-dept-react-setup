import { HttpClient } from './Http'

class FirestoreClient {
  client: HttpClient

  constructor() {
    this.client = new HttpClient({
      baseUrl: '/api',
    })
  }

  update = (data: any) => this.client.put('/firestore', data)
  create = (data: any) => this.client.post('/firestore', data)
  remove = (data: any) => this.client.delete('/firestore', data)
}

export const firestoreClient = new FirestoreClient()
