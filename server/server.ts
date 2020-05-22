import * as gitApi from '@tinacms/api-git'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import next from 'next'

const port = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app
  .prepare()
  .then(() => {
    const server = express()

    server.use(helmet() as any)
    server.use(cors() as any)
    server.use(
      '/___tina',
      gitApi.router({
        pathToRepo: process.cwd(),
        pathToContent: '',
      } as any),
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
