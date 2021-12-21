import {
  Alert,
  AlertDescription,
  AlertIcon,
  Heading,
  Link,
  ListItem,
  UnorderedList,
} from '@chakra-ui/react';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';

const Page: NextPage = () => {
  return (
    <>
      <NextSeo title="Examples" description="Examples of the components in this setup" />

      <Alert status="warning" mb="8">
        <AlertIcon />
        <AlertDescription>
          <strong>Make sure to check Storybook</strong>. A lot of custom components that where by
          default included in this setup, have been deleted. Components that can not be found here
          anymore can be implemented with{' '}
          <Link href="https://chakra-ui.com/docs" target="_blank">
            Chakra UI components
          </Link>
          .
        </AlertDescription>
      </Alert>

      <Heading size="lg">Links to Chakra alternatives for deleted components</Heading>
      <UnorderedList fontSize="2xl" mt="8" mb="12">
        <ListItem>
          <Link href="https://chakra-ui.com/docs/overlay/menu" target="_blank">
            Menu
          </Link>
        </ListItem>
      </UnorderedList>

      <Heading size="lg">Components that are still custom and in Storybook are:</Heading>
      <UnorderedList fontSize="2xl" mt="8">
        <ListItem>Grid</ListItem>
        <ListItem>Modal (replaced with a small wrapper around the Chakra Modal)</ListItem>
      </UnorderedList>
    </>
  );
};

export default Page;
