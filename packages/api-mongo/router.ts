import express from 'express'

import { DatabaseClient } from '../next-tinacms-db/utils/types'

interface DatabaseRouterConfig {
  db: DatabaseClient
}

export function router({ db }: DatabaseRouterConfig) {
  const mongoRouter = express.Router()

  mongoRouter.post('/document', async (req, res) => {
    try {
      await db.createDocument(req.body)
      res.status(201).json()
    } catch (err) {
      console.error(err)
      res.status(500).end()
    }
  })

  mongoRouter.put('/document', async (req, res) => {
    try {
      await db.updateDocument(req.body)
      res.status(204).end()
    } catch (err) {
      console.error(err)
      res.status(500).end()
    }
  })

  return mongoRouter
}
