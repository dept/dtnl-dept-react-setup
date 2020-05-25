import { ActionButton, AddContentPlugin, TinaCMS, usePlugins } from 'tinacms'

import { DatabaseClient } from './utils/types'

const PAGE_FIELDS = [
  { name: 'slug', label: 'Slug', component: 'text' },
  { name: 'published', label: 'Publisehd', component: 'toggle' },
  { name: 'body', label: 'Body', component: 'markdown' },
]

export const pageCreatorPlugin: AddContentPlugin<any> = {
  __type: 'content-creator',
  name: 'Page',
  fields: PAGE_FIELDS,
  async onSubmit({ slug, ...formData }, cms: TinaCMS) {
    const db: DatabaseClient = cms.api.db

    await db.createDocument({
      slug: `/environment/test/pages/${slug}`,
      formData,
    })

    cms.alerts.success(`Saved Successfully: Changed saved to database`)
  },
}

export function usePageCreatorPlugin() {
  usePlugins(pageCreatorPlugin)
}

const ActionReset = ({ form, close }: any) => {
  return (
    <ActionButton
      onClick={() => {
        form.finalForm.reset()
      }}>
      Reset
    </ActionButton>
  )
}
