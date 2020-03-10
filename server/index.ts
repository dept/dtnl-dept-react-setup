import express, { RequestHandler } from 'express'
import next from 'next'
import path from 'path'

const port = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app
  .prepare()
  .then(() => {
    const server = express()

    // serve favicon folder on root
    server.use(express.static('public/favicon'))
    server.get('/service-worker.js', ServiceWorker(app))

    server.get('*', (req, res) => handle(req, res))
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

const ServiceWorker = (server: typeof app): RequestHandler => (req, res) => {
  const filePath = path.join(__dirname, '../', '.next', 'service-worker.js')
  server.serveStatic(req, res, filePath)
}
