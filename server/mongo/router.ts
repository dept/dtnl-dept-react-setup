import express from 'express'

import { db } from './client'

export const mongoRouter = express.Router()

mongoRouter.get('/globals', async (req, res) => {
  try {
    const globals = await db.getCollection('global')
    res.json(globals)
  } catch (err) {
    console.error(err)
  }

  res.send('hello')
})

mongoRouter.put('/:collection/:slug', async (req, res) => {
  const formData = req.body

  const { slug, collection } = req.params

  try {
    await db.updateDocument({
      collection,
      slug,
      formData,
    })
    res.status(201).end()
  } catch (err) {
    console.error(err)
    res.status(500).end()
  }
})
