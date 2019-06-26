import * as express from 'express'
import * as next from 'next'

import { createRoutes } from './router'

const port = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app
  .prepare()
  .then(() => {
    const server = express()

    server.use(createRoutes(app))

    server.get('*', (req, res) => handle(req, res))

    server.listen(port, (err: Error) => {
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
