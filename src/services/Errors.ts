export interface HttpErrorInput {
  message: string
  statusCode: number
  response?: Response
  body?: any
}

export class HttpError extends Error {
  statusCode: number
  response?: Response
  body?: any

  constructor(input: HttpErrorInput) {
    super(input.message)
    this.response = input.response
    this.statusCode = input.statusCode
    this.body = input.body
    this.name = 'HttpError'
  }
}
