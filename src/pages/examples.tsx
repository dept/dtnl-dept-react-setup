import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import * as icons from 'react-icons/md';

import { Button } from '@/components/shared/Button';
import { Box, BoxProps, Column, Flex, Row } from '@/components/shared/Grid';
import { Hyperlink } from '@/components/shared/Hyperlink';
import { Modal } from '@/components/shared/Modal';
import { useModal } from '@/components/shared/Modal/modalStore';
import { Reveal } from '@/components/shared/Reveal';
import { Heading, Text } from '@/components/shared/Text';

function Section(props: BoxProps) {
  return (
    <Reveal>
      <Box p={30} {...props} />
    </Reveal>
  );
}
function SectionHeader(props: BoxProps) {
  return (
    <Box borderBottom="1px solid" borderColor="primary" mb={30}>
      <Heading {...props} />
    </Box>
  );
}
function GridExampleBox(props: BoxProps) {
  return <Box bg="primary" color="white" p={15} my={5} fontSize={14} {...props} />;
}

const Page: NextPage = () => {
  const { show: showModal } = useModal('uniqueModalId');

  return (
    <>
      <NextSeo title="Examples" description="Examples of the components in this setup" />
      <Section>
        <SectionHeader>Grid</SectionHeader>
        <Row>
          <Column col={[12, 4]}>
            <GridExampleBox>1</GridExampleBox>
          </Column>
          <Column col={[12, 4]}>
            <GridExampleBox>2</GridExampleBox>
          </Column>
          <Column col={[12, 4]}>
            <GridExampleBox>3</GridExampleBox>
          </Column>
        </Row>
      </Section>

      <Section>
        <SectionHeader>Typography</SectionHeader>

        <Heading as="h1">Heading 1</Heading>
        <Heading as="h2">Heading 2</Heading>
        <Heading as="h3">Heading 3</Heading>
        <Heading as="h4">Heading 4</Heading>
        <Heading as="h5">Heading 5</Heading>
        <Heading as="h6">Heading 6</Heading>
        <Text as="strong">Strong</Text>
        <Text as="p">Paragraph</Text>
      </Section>

      <Section>
        <SectionHeader>Buttons</SectionHeader>

        <Button variant="primary" size="small">
          Button
        </Button>
        <Button variant="secondary" size="medium">
          Button
        </Button>
        <Button variant="primary" size="large">
          Button
        </Button>
      </Section>

      <Section>
        <SectionHeader>Modal</SectionHeader>

        <Button onClick={() => showModal()}>Open modal</Button>

        <Modal id="uniqueModalId">
          <Box p={50}>This is a modal</Box>
        </Modal>
      </Section>

      <Section>
        <SectionHeader>Icons</SectionHeader>

        <Flex flexWrap="wrap">
          {Object.entries(icons).map(([key, Icon]) => (
            <Box key={key} p={1} color="secondary">
              <Icon size={30} />
            </Box>
          ))}
        </Flex>
      </Section>

      <Section>
        <Hyperlink href="/about">This is a link</Hyperlink>
      </Section>
    </>
  );
};

export default Page;
