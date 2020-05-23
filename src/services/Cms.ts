import { HttpClient } from './Http'

const cmsClient = new HttpClient({
  baseUrl: '/___tina',
})

interface CmsInput {
  collection: string
  slug: string
  formData: any
}

export const Cms = {
  update({ collection, slug, formData }: CmsInput) {
    return cmsClient.put(`/${collection}/${slug}`, formData)
  },
}
