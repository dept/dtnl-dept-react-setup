export interface RouteItem {
  slug: string
  actualPage: string
}

export const routes = {
  index: {
    slug: '/',
    actualPage: '/',
  },
  about: {
    slug: '/about',
    actualPage: '/about',
  },
  productDetail: {
    slug: '/product/:productId',
    actualPage: '/product',
  },
}
