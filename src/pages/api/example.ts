import { NextApiHandler } from 'next';

const handle: NextApiHandler = (req, res) => {
  res.end('Hello World');
};

export default handle;
