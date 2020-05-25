const user = process.env.MONGO_USER
const pass = process.env.MONGO_PASSWORD

const uri = `mongodb+srv://${user}:${pass}@cluster0-utu8u.mongodb.net/test?retryWrites=true&w=majority`

import { MongoDataseClient } from '../../packages/api-mongo/databaseClient'

export const db = new MongoDataseClient({
  uri,
  db: 'cms',
  defaultCollection: 'documents',
})
