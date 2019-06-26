import * as express from 'express'
import * as pathToRegexp from 'path-to-regexp'

import { RouteItem, routes } from './routes'

interface Params {
  [key: string]: string
}

const router = express.Router({
  strict: true,
})

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

export function createRoutes(app: any) {
  for (const key in routes) {
    if (routes.hasOwnProperty(key)) {
      const route = routes[key as keyof typeof routes]

      router.get(route.slug, (req, res) => {
        const params = getRouteParams(route, req)
        app.render(req, res, route.actualPage, { ...req.query, ...params })
      })
    }
  }

  return router
}
