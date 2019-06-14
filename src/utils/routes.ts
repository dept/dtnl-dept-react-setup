import { RouteItem } from '@server/routes'
import * as pathToRegexp from 'path-to-regexp'
interface Params {
  [key: string]: string | number
}

function getRouteSlug(route: RouteItem, params?: Params) {
  const toPath = pathToRegexp.compile(route.slug)
  return toPath(params)
}

export const getRouteProps = (route: RouteItem, params?: Params, passHref = true) => {
  return {
    href: {
      pathname: route.actualPage,
      query: params,
    },
    passHref,
    as: getRouteSlug(route, params),
  }
}
