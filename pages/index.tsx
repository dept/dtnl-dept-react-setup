import { Box, Card, Column, Contain, Flex, Heading, Row, Text } from '@tpdewolf/styled-primitives'
import { Form, Formik } from 'formik'
import { NextPage } from 'next'
import * as Yup from 'yup'

import { Button, Icon, icons } from '@/components/atoms'
import { Modal } from '@/components/molecules'
import { FormikDate, FormikInput, FormikSelect } from '@/components/molecules/Formik'
import { BaseLayout } from '@/components/templates'
import { useModal } from '@/context/ModalContext'

const Section: React.FC = props => <Box p={30} {...props} />

const SectionHeader: React.FC = props => (
  <Card borderBottom="1px solid" borderColor="primary" mb={30}>
    <Heading {...props} />
  </Card>
)

const Page: NextPage = () => {
  const modalStore = useModal()
  return (
    <BaseLayout>
      <Contain>
        <Section>
          <SectionHeader>Grid</SectionHeader>
          <Row>
            <Column col={[12, 4]}>
              <Box bg="primary" color="white" p={10}>
                1
              </Box>
            </Column>
            <Column col={[12, 4]}>
              <Box bg="primary" color="white" p={10}>
                2
              </Box>
            </Column>
            <Column col={[12, 4]}>
              <Box bg="primary" color="white" p={10}>
                3
              </Box>
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
              email: Yup.string()
                .email()
                .required('This field is required'),
              date: Yup.date().required('This field is required'),
              select: Yup.string()
                .required('This field is required')
                .nullable(),
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
                <FormikSelect
                  name="select"
                  options={[
                    {
                      label: 'Option 1',
                      value: 1,
                    },
                    {
                      label: 'Option 2',
                      value: 2,
                    },
                  ]}
                />

                <Button type="submit">Submit</Button>
              </Form>
            )}
          </Formik>
        </Section>

        <Section>
          <SectionHeader>Modal</SectionHeader>

          <Button onClick={() => modalStore.show('uniqueModalId')}>Open modal</Button>

          <Modal
            isOpen={modalStore.isShown('uniqueModalId')}
            onDismiss={() => modalStore.hide('uniqueModalId')}>
            <Box p={50}>This is a modal</Box>
          </Modal>
        </Section>

        <Section>
          <SectionHeader>Icons</SectionHeader>

          <Flex flexWrap="wrap">
            {Object.keys(icons).map(icon => (
              <Box key={icon} p={5}>
                <Icon icon={icon as keyof typeof icons} size={50} color="secondary"></Icon>
              </Box>
            ))}
          </Flex>
        </Section>
      </Contain>
    </BaseLayout>
  )
}

export default Page
