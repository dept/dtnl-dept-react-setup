import { NextApiRequest, NextApiResponse } from 'next';

export type Article = {
  id: number;
  title: string;
  content: string;
};

export const articles: Article[] = [
  {
    id: 1,
    title: 'Example blog post',
    content: 'Awesome content',
  },
  {
    id: 2,
    title: 'Another example blog post',
    content: 'More awesome content',
  },
];

type Data = {
  articles: Article[];
};

export default function handler(_req: NextApiRequest, res: NextApiResponse<Data>) {
  res.status(200).json({ articles });
}
