import { FORM_ERROR } from 'final-form'
import { FormOptions, TinaCMS } from 'tinacms'

interface MongoSubmitOptions {
  cms: TinaCMS
  collection: string
  slug: string
  onSubmit?: SubmitHandler
}

type SubmitHandler = FormOptions<any>['onSubmit']

export const createMongoSubmitHandler = ({
  cms,
  collection,
  slug,
  onSubmit,
}: MongoSubmitOptions): SubmitHandler => async formData => {
  try {
    const mongo: any = cms.api.mongodb

    console.log(mongo)

    await mongo.update({
      collection,
      slug,
      formData,
    })

    cms.alerts.success(`Saved Successfully: Changed saved to database`)

    return onSubmit
  } catch (error) {
    return { [FORM_ERROR]: error }
  }
}
