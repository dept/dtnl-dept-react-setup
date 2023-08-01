import { CustomLink } from './Link';

export default { title: 'Atoms/Link', component: CustomLink };

export const Example = () => <CustomLink href="/">Go to page</CustomLink>;

Example.story = {
  parameters: {
    info: 'The Next.js <Link> component differs from the react-router Link component. Check Next.js documentation: https://nextjs.org/docs#with-link',
  },
};
