import { NextApiRequest, NextApiResponse } from 'next';
import { Article, articles } from '../articles';

export default function handler(req: NextApiRequest, res: NextApiResponse<{ article?: Article }>) {
  const { id } = req.query;

  const article = articles.find(item => item.id.toString() === id);

  res.status(200).json({ article });
}
