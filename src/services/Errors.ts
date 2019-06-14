export interface HttpErrorInput {
  message: string
  response: Response
  status: number
  body: any
}

export class HttpError extends Error {
  response: Response
  status: number
  body: any

  constructor(input: HttpErrorInput) {
    super(input.message)
    this.response = input.response
    this.status = input.status
    this.body = input.body
    this.name = 'HttpError'
  }
}
