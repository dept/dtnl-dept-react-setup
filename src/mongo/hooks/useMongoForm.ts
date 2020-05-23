import { FormOptions, useCMS, useForm, usePlugin, WatchableFormValue } from 'tinacms'

import { createMongoSubmitHandler } from '../utils/onSubmit'

type MongoFormOptions = Omit<FormOptions<any>, 'id'>

export const useMongoForm = <T = any>(
  collection: string,
  slug: string,
  options: MongoFormOptions,
  watch?: Partial<WatchableFormValue>,
) => {
  const cms = useCMS()
  const [formData, form] = useForm<T>(
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
