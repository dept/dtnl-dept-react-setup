import { FormOptions, useCMS, useGlobalForm, usePlugin, WatchableFormValue } from 'tinacms'

import { createMongoSubmitHandler } from '../utils/onSubmit'

type MongoFormOptions = Omit<FormOptions<any>, 'id'>

export const useMongoGlobalForm = <T = any>(
  collection: string,
  slug: string,
  options: MongoFormOptions,
  watch?: Partial<WatchableFormValue>,
) => {
  const cms = useCMS()
  const [formData, form] = useGlobalForm<T>(
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
