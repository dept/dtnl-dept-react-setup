import { Field, FormOptions } from 'tinacms'

export interface DocumentUri {
  slug: string
  collection?: string
}

export interface DocumentInput extends DocumentUri {
  formData: any
}

export interface DatabaseFormOptions {
  collection?: string
  label: string
  fields: Field[]
  actions?: FormOptions<any>['actions']
}

export interface DatabaseClient {
  updateDocument: (input: DocumentInput) => Promise<any>
  createDocument: (input: DocumentInput) => Promise<any>
  removeDocument: (input: DocumentUri) => Promise<any>
}
