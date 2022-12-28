import { Article } from '@/pages/api/articles';
import { NextSeo } from 'next-seo';
import { PageRender } from './render';

export async function getPosts(): Promise<Article[]> {
  const res = await fetch('http://localhost:3000/api/articles', {
    next: {},
  });
  const posts = await res.json();
  return posts.articles;
}

export default async function Page() {
  const articles = await getPosts();

  return (
    <>
      <NextSeo title="Blog" description="An overview of our blog posts" useAppDir />
      <PageRender articles={articles} />
    </>
  );
}

export const revalidate = 'force-cache';
