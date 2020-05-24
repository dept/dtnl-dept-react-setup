import * as cloudinary from 'api-cloudinary'
import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import next from 'next'

require('dotenv').config()

import { router as mongoRouter } from '../packages/api-mongo/router'
import { db } from './mongo'

const port = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app
  .prepare()
  .then(() => {
    const server = express()

    server.use(cors() as any)
    server.use(bodyParser.json())
    server.use(helmet() as any)
    server.use(
      '/___db',
      mongoRouter({
        db,
      }),
    )

    server.use(
      '/___tina/cloudinary',
      cloudinary.router({
        cloud_name: 'dy9ejxrsw',
        api_key: '873592917847126',
        api_secret: 'YUGD7CiL_y3UPb_mUi75pvmIH_U',
      }),
    )

    server.get('/service-worker.js', express.static('.next/service-worker.js'))
    server.all('*', (req, res) => handle(req, res))

    server.listen(port, (err?: Error) => {
      if (err) {
        throw err
      }
      console.log(`> Ready on http://localhost:${port}`)
    })
  })
  .catch(ex => {
    console.error(ex.stack)
    process.exit(1)
  })
