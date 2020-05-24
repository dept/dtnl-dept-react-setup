import { Db, MongoClient } from 'mongodb'

import { DatabaseClient, DocumentInput, DocumentUri } from '../next-tinacms-db/utils/types'

interface MongoServiceConfig {
  uri: string
  db: string
  defaultCollection: string
}

export class MongoDataseClient implements DatabaseClient {
  private client: MongoClient
  public db: Db | null = null

  constructor(private config: MongoServiceConfig) {
    this.client = new MongoClient(config.uri, { useNewUrlParser: true, useUnifiedTopology: true })
  }

  async connect() {
    if (!this.client.isConnected()) await this.client.connect()

    const { db } = this.config
    this.db = this.client.db(db)
  }

  async getDocument({ collection = this.config.defaultCollection, slug }: DocumentUri) {
    await this.connect()
    const db = this.db!.collection(collection)
    let document = await db.findOne({
      slug,
    })

    if (!document) {
      document = await this.createDraft({
        slug,
        collection,
      })
    }

    return this.serialize(document)
  }

  async createDraft({ slug, collection = this.config.defaultCollection }: DocumentUri) {
    const insert = await this.db!.collection(collection).insertOne({
      status: 'draft',
      slug,
      createdAt: new Date(),
      updatedAt: new Date(),
      fields: {},
    })
    return insert.ops as any
  }

  async getCollection(collection: string) {
    await this.connect()
    const db = this.db!.collection(collection)
    const documents = await db.find().toArray()
    return this.serialize(documents)
  }

  async createDocument({ slug, collection }: DocumentUri) {
    await this.connect()
    return this.createDraft({
      slug,
      collection,
    })
  }

  async updateDocument({
    slug,
    collection = this.config.defaultCollection,
    formData,
  }: DocumentInput) {
    await this.connect()

    const document = await this.getDocument({
      collection,
      slug,
    })

    if (!document) {
      throw new Error('Document not found')
    }

    await this.db!.collection(collection).updateOne(
      {
        slug,
      },
      {
        $set: {
          fields: formData,
        },
      },
    )
  }

  async removeDocument({ collection = this.config.defaultCollection, slug }: DocumentUri) {
    await this.connect()
    await this.db!.collection(collection).remove({
      slug,
    })
  }

  serialize(data: any) {
    return JSON.parse(JSON.stringify(data))
  }
}
