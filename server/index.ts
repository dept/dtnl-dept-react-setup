// import * as compression from 'compression'
import * as express from 'express'
import * as next from 'next'
import * as pathToRegexp from 'path-to-regexp'

import { RouteItem, routes } from './routes'

interface Params {
  [key: string]: string
}

const port = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

function getRouteParams(route: RouteItem, req: express.Request) {
  const parsedUrl = pathToRegexp.parse(route.slug)

  const paramKeys = parsedUrl
    .filter(part => typeof part === 'object')
    .map((obj: any) => String(obj.name))

  let params: Params = {}
  if (paramKeys && paramKeys.length > 0) {
    params = paramKeys.reduce(
      (obj, param) => {
        obj[param] = req.params[param]
        return obj
      },
      {} as Params,
    )
  }
  return params
}

function createRoute(server: express.Express, route: RouteItem) {
  server.get(route.slug, (req, res) => {
    const params = getRouteParams(route, req)
    app.render(req, res, route.actualPage, params)
  })
}

app
  .prepare()
  .then(() => {
    const server = express()
    // server.use(compression())

    for (const key in routes) {
      if (routes.hasOwnProperty(key)) {
        createRoute(server, routes[key as keyof typeof routes])
      }
    }

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
