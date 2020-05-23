import { FormOptions, useCMS, useLocalForm, usePlugin, WatchableFormValue } from 'tinacms'

import { createMongoSubmitHandler } from '../utils/onSubmit'

type MongoFormOptions = Omit<FormOptions<any>, 'id'>

export const useMongoLocalForm = <T = any>(
  collection: string,
  slug: string,
  options: MongoFormOptions,
  watch?: Partial<WatchableFormValue>,
) => {
  const cms = useCMS()
  const [formData, form] = useLocalForm<T>(
    {
      id: slug,
      ...options,
      onSubmit: createMongoSubmitHandler({ cms, slug, collection, onSubmit: options.onSubmit }),
    },
    watch,
  )

  // usePlugin(form)

  return [formData, form]
}
