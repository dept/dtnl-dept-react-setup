import { Form, Formik } from 'formik';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import React from 'react';
import * as icons from 'react-icons/hi';
import * as Yup from 'yup';

import { Button } from '@/components/atoms/Button';
import { Box, Column, Flex, Grid, Row } from '@/components/atoms/Grid';
import { Hyperlink } from '@/components/atoms/Hyperlink';
import { Reveal } from '@/components/atoms/Reveal';
import { Heading, Text } from '@/components/atoms/Text';
import { FormikDate, FormikInput } from '@/components/molecules/Formik';
import { Modal } from '@/components/molecules/Modal';
import { useModalActions } from '@/context/ModalContext';

import { FieldSelect } from '../components/molecules/Form/FieldSelect';

const Section: React.FC = props => (
  <Reveal>
    <Box p={30} {...props} />
  </Reveal>
);

const SectionHeader: React.FC = props => (
  <Box borderBottom="1px solid" borderColor="primary" mb={30}>
    <Heading {...props} />
  </Box>
);

const GridExampleBox: React.FC = props => (
  <Box bg="primary" color="white" p={15} my={5} fontSize={14} {...props} />
);

const Page: NextPage = () => {
  const modalActions = useModalActions();

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
        <SectionHeader>Form</SectionHeader>

        <Formik
          initialValues={{
            text: '',
            email: '',
            number: 0,
            date: '2019-01-01',
            select: null,
            check: true,
            radio: 'test',
          }}
          validationSchema={Yup.object({
            text: Yup.string().required('This field is required'),
            number: Yup.string().required('This field is required'),
            email: Yup.string().email().required('This field is required'),
            date: Yup.date().required('This field is required'),
            select: Yup.string().required('This field is required').nullable(),
          })}
          onSubmit={values => console.log(values)}>
          {() => (
            <Form>
              <FormikInput label="Text field" name="text" placeholder="This is a text field" />
              <FormikInput
                type="email"
                label="Email field"
                name="email"
                placeholder="This is a email field"
              />
              <FormikInput
                type="number"
                label="Number field"
                name="number"
                placeholder="This is a number field"
              />
              <FormikDate name="date" label="Date field" placeholder="This is a date field" />
              <FieldSelect
                name="select"
                // native
                placeholder={''}
                label="Dingen"
                defaultValue={2}
                onChange={e => console.log(e)}
                items={[
                  {
                    value: 1,
                    label: 'Test 1',
                  },
                  {
                    value: 2,
                    label: 'Test 2',
                  },
                  {
                    value: 3,
                    label: 'Test 3',
                  },
                ]}
              />{' '}
              <Button type="submit">Submit</Button>
            </Form>
          )}
        </Formik>
      </Section>

      <Section>
        <SectionHeader>Modal</SectionHeader>

        <Button onClick={() => modalActions.show('uniqueModalId')}>Open modal</Button>

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
