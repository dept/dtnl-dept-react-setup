import Link from 'next/link';

export default { title: 'Atoms/Link', component: Link };

export const Example = () => <Link href="/">Go to page</Link>;

Example.story = {
  parameters: {
    info: 'The Next.js <Link> component differs from the react-router Link component. Check Next.js documentation: https://nextjs.org/docs#with-link',
  },
};
