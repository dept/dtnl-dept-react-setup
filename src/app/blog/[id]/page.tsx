import { notFound } from 'next/navigation';
import { getPosts } from '../page';
import { PageRender } from './render';

type Props = {
  params: {
    id?: string;
  };
};

export default async function Page({ params }: Props) {
  const res = await fetch(`http://localhost:3000/api/articles/${params.id}`);
  const { article } = await res.json();

  if (!article) {
    notFound();
  }

  return <PageRender article={article} />;
}

export async function generateStaticParams() {
  const posts = await getPosts();

  return posts.map(post => ({
    id: post.id.toString(),
  }));
}
