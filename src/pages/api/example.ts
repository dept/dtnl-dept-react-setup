import { NextApiRequest, NextApiResponse } from 'next'

export default function example(_req: NextApiRequest, res: NextApiResponse) {
  res.end('Hello World')
}
