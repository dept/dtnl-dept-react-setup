import { Db, MongoClient } from 'mongodb'

const user = process.env.MONGO_USER
const pass = process.env.MONGO_PASSWORD

const uri = `mongodb+srv://${user}:${pass}@cluster0-utu8u.mongodb.net/test?retryWrites=true&w=majority`

interface MongoServiceConfig {
  uri: string
  db: string
}

interface DocumentUri {
  collection: string
  slug: string
}

class MongoService {
  client: MongoClient
  config: MongoServiceConfig
  db: Db | null = null

  constructor(config: MongoServiceConfig) {
    console.log(config)

    this.config = config
    this.client = new MongoClient(config.uri, { useNewUrlParser: true, useUnifiedTopology: true })
  }

  async connect() {
    if (!this.client.isConnected()) await this.client.connect()

    const { db } = this.config
    this.db = this.client.db(db)
  }

  async getDocument({ collection, slug }: DocumentUri) {
    await this.connect()
    const db = this.db!.collection(collection)
    let document = await db.findOne({
      slug,
    })

    if (!document) {
      const insert = await db.insertOne({
        status: 'draft',
        slug,
        createdAt: new Date(),
        updatedAt: new Date(),
        fields: {},
      })
      document = insert.ops as any
    }

    return this.serialize(document)
  }

  async getCollection(collection: string) {
    await this.connect()
    const db = this.db!.collection(collection)
    const documents = await db.find().toArray()
    return this.serialize(documents)
  }

  async updateDocument({ slug, collection, formData }: DocumentUri & { formData: any }) {
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

  async removeDocument({ collection, slug }: DocumentUri) {
    await this.connect()

    await this.db!.collection(collection).remove({
      slug,
    })
  }

  serialize(data: any) {
    return JSON.parse(JSON.stringify(data))
  }
}

export const db = new MongoService({
  uri,
  db: 'cms',
})
