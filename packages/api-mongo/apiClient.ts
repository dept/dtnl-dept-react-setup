import { DatabaseClient, DocumentInput, DocumentUri } from '../next-tinacms-db/utils/types'

export class MongoApiClient implements DatabaseClient {
  constructor(
    private config: {
      baseUrl: string
    },
  ) {
    //
  }

  private request(method: string, data: DocumentInput | DocumentUri) {
    return fetch(this.config.baseUrl + '/document', {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(res => {
      if (!res.ok) {
        throw new Error('Database request failed')
      }

      return res.json()
    })
  }

  removeDocument(data: DocumentUri) {
    return this.request('POST', data)
  }

  createDocument(data: DocumentInput) {
    return this.request('POST', data)
  }

  updateDocument(data: DocumentInput) {
    return this.request('PUT', data)
  }
}
