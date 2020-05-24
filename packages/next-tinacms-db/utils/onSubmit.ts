import { FORM_ERROR } from 'final-form'
import { FormOptions, TinaCMS } from 'tinacms'

import { DatabaseClient, DocumentUri } from './types'

interface DatabaseSubmitOptions extends DocumentUri {
  cms: TinaCMS
  onSubmit?: SubmitHandler
}

type SubmitHandler = FormOptions<any>['onSubmit']

export const createDatabaseSubmitHandler = ({
  cms,
  collection,
  slug,
  onSubmit,
}: DatabaseSubmitOptions): SubmitHandler => async formData => {
  try {
    const db: DatabaseClient = cms.api.db

    console.log({
      collection,
      slug,
      formData,
    })

    await db.updateDocument({
      collection,
      slug,
      formData,
    })

    cms.alerts.success(`Saved Successfully: Changed saved to database`)

    return onSubmit
  } catch (error) {
    cms.alerts.error(`Update to database failed`)
    return { [FORM_ERROR]: error }
  }
}
