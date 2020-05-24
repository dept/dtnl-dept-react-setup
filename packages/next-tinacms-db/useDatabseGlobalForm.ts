import { useCMS, useGlobalForm } from 'tinacms'

import { createDatabaseSubmitHandler } from './utils/onSubmit'
import { DatabaseFormOptions } from './utils/types'

export const useDatabaseGlobalForm = <T = any>(data: any, options: DatabaseFormOptions) => {
  const cms = useCMS()
  const { slug } = data
  const { collection, ...restOptions } = options

  const [formData, form] = useGlobalForm<T>({
    id: slug,
    initialValues: data.fields,
    ...restOptions,
    onSubmit: createDatabaseSubmitHandler({ cms, slug, collection }),
  })

  // usePlugin(form)

  return [formData, form]
}
