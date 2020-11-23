import { FieldArray, Form, Formik, FormikConfig } from 'formik';
import { FC } from 'react';
import { HiOutlineMail } from 'react-icons/hi';

import { Button } from '@/components/atoms/Button';
import { Column, Row, Stack } from '@/components/atoms/Grid';
import { Heading } from '@/components/atoms/Text';
import { Option } from '@/components/molecules/Form';
import {
  FormikCheckboxGroup,
  FormikInput,
  FormikRadioGroup,
  FormikSelect,
} from '@/components/molecules/Formik';
import { FormikDate } from '@/components/molecules/Formik/FormikDate';
import { FormikNumberFormat } from '@/components/molecules/Formik/FormikNumberFormat';
import { FormikScrollToErrors } from '@/components/molecules/Formik/FormikScrollToErrors';

interface ProgrammingLanguageFieldsProps {
  index: number;
  onRemove: () => void;
}

const ProgrammingLanguageFields: FC<ProgrammingLanguageFieldsProps> = ({ index, onRemove }) => {
  return (
    <Row>
      <Column col={4}>
        <FormikInput label="Name" name={`programmingLanguages[${index}].name`} required />
      </Column>
      <Column col={4}>
        <FormikInput
          label="Years experience"
          type="number"
          name={`programmingLanguages[${index}].years`}
          required
        />
      </Column>
      <Column col={4} alignSelf="flex-end">
        <Button onClick={onRemove}>Remove</Button>
      </Column>
    </Row>
  );
};

type FormikExampleFormProps = FormikConfig<any> & {
  countries: Option[];
  languages: Option[];
  animals: Option[];
  initialProgrammingLanguage: any;
};

export const FormikExampleForm: FC<FormikExampleFormProps> = ({
  initialProgrammingLanguage,
  countries,
  languages,
  animals,
  ...props
}) => {
  return (
    <Formik {...props}>
      {({ values, resetForm }) => (
        <Form noValidate>
          <FormikScrollToErrors />
          <Stack space={4}>
            <Heading>General</Heading>
            <Row>
              <Column col={6}>
                <FormikInput
                  name="firstname"
                  label="First name"
                  placeholder="First name"
                  required
                  clearable
                />
              </Column>
              <Column col={6}>
                <FormikInput name="lastname" label="Last name" placeholder="Last name" required />
              </Column>

              <Column col={6}>
                <FormikInput
                  start={<HiOutlineMail />}
                  type="email"
                  name="email"
                  label="Email"
                  placeholder="E-mail"
                  required
                  clearable
                />
              </Column>
              <Column col={6}>
                <FormikDate
                  name="dob"
                  label="Date of birth"
                  placeholder="Date of birth"
                  required
                  clearable
                />
              </Column>
              <Column col={6}>
                <FormikSelect
                  name="country"
                  label="Country"
                  options={countries}
                  placeholder="Choose country"
                  required
                />
              </Column>
              <Column col={6}>
                <FormikInput
                  name="phoneNumber"
                  label="Phone number"
                  type="tel"
                  placeholder="+31 06 12 34 56 78"
                  mask="+31 99 99 99 99 99"
                  required
                />
              </Column>
              <Column col={6}>
                <FormikNumberFormat
                  prefix="€"
                  thousandSeparator
                  label="Money?"
                  name="currency"
                  placeholder="How much money would you like?"
                />
              </Column>
            </Row>

            <Heading>Skills</Heading>
            <Heading as="h3">Languages</Heading>
            <FormikCheckboxGroup
              name="languages"
              options={languages}
              direction="horizontal"
              required
            />

            <Heading as="h3">Programming languages</Heading>
            <FieldArray name="programmingLanguages">
              {helpers => {
                return (
                  <>
                    {values.programmingLanguages.map((lang: any, index: number) => {
                      return (
                        <ProgrammingLanguageFields
                          key={index}
                          index={index}
                          onRemove={() => helpers.remove(index)}
                        />
                      );
                    })}

                    <Button onClick={() => helpers.push(initialProgrammingLanguage)}>
                      Insert new +
                    </Button>
                  </>
                );
              }}
            </FieldArray>

            <Heading>Interests</Heading>
            <Heading as="h3">Favorite animal</Heading>
            <FormikRadioGroup
              name="favoriteAnimal"
              required
              options={animals}
              direction="horizontal"
            />

            <Row>
              <Column>
                <Button variant="secondary" onClick={() => resetForm()}>
                  Reset
                </Button>
              </Column>
              <Column>
                <Button type="submit">Submit</Button>
              </Column>
            </Row>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};
