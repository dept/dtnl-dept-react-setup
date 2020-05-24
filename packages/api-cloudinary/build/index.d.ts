interface RouterConfig {
  cloud_name: string
  api_key: string
  api_secret: string
}
export declare const router: (config: RouterConfig) => import('express-serve-static-core').Router
export {}
