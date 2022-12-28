'use-client';

import { Button, Heading, SimpleGrid, Stack } from '@chakra-ui/react';
import { FieldArray, Form, Formik, FormikConfig } from 'formik';
import { HiOutlineMail } from 'react-icons/hi';

import { Option } from '@/components/shared/Form';
import {
  FormikCheckboxGroup,
  FormikInput,
  FormikRadioGroup,
  FormikSelect,
} from '@/components/shared/Formik';
import { FormikDate } from '@/components/shared/Formik/FormikDate';
import { FormikNumberFormat } from '@/components/shared/Formik/FormikNumberFormat';
import { FormikScrollToErrors } from '@/components/shared/Formik/FormikScrollToErrors';

interface ProgrammingLanguageFieldsProps {
  index: number;
  onRemove: () => void;
}

function ProgrammingLanguageFields({ index, onRemove }: ProgrammingLanguageFieldsProps) {
  return (
    <SimpleGrid columns={{ base: 1, md: 3 }} gap="md">
      <FormikInput label="Name" name={`programmingLanguages[${index}].name`} required />
      <FormikInput
        label="Years experience"
        type="number"
        name={`programmingLanguages[${index}].years`}
        required
      />
      <Button onClick={onRemove}>Remove</Button>
    </SimpleGrid>
  );
}

type FormikExampleFormProps = FormikConfig<any> & {
  countries: Option[];
  languages: Option[];
  animals: Option[];
  initialProgrammingLanguage: any;
};

export function FormikExampleForm({
  initialProgrammingLanguage,
  countries,
  languages,
  animals,
  ...props
}: FormikExampleFormProps) {
  return (
    <Formik {...props}>
      {({ values, resetForm }) => (
        <Form noValidate>
          <FormikScrollToErrors />
          <Stack spacing={4}>
            <Heading as="h2" fontSize="xl">
              General
            </Heading>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing="md">
              <FormikInput
                name="firstname"
                label="First name"
                placeholder="First name"
                required
                clearable
              />

              <FormikInput name="lastname" label="Last name" placeholder="Last name" required />

              <FormikInput
                start={<HiOutlineMail />}
                type="email"
                name="email"
                label="Email"
                placeholder="E-mail"
                required
                clearable
              />

              <FormikDate
                name="dob"
                label="Date of birth"
                placeholder="Date of birth"
                required
                clearable
              />
              <FormikSelect
                name="country"
                label="Country"
                options={countries}
                placeholder="Choose country"
                required
              />
              <FormikInput
                name="phoneNumber"
                label="Phone number"
                type="tel"
                placeholder="+31 06 12 34 56 78"
                required
              />
              <FormikNumberFormat
                prefix="€"
                thousandSeparator
                label="Money?"
                name="currency"
                placeholder="How much money would you like?"
              />
            </SimpleGrid>
            <Heading as="h2" fontSize="xl">
              Skills
            </Heading>
            <Heading as="h3" fontSize="md">
              Languages
            </Heading>
            <FormikCheckboxGroup
              name="languages"
              options={languages}
              direction="horizontal"
              required
            />

            <Heading as="h3" fontSize="md">
              Programming languages
            </Heading>
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

                    <Button width="200px" onClick={() => helpers.push(initialProgrammingLanguage)}>
                      Insert new +
                    </Button>
                  </>
                );
              }}
            </FieldArray>

            <Heading as="h2" fontSize="xl">
              Interests
            </Heading>
            <Heading as="h3" fontSize="md">
              Favorite animal
            </Heading>
            <FormikRadioGroup
              name="favoriteAnimal"
              required
              options={animals}
              direction="horizontal"
            />

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing="md">
              <Button variant="secondary" onClick={() => resetForm()}>
                Reset
              </Button>

              <Button type="submit">Submit</Button>
            </SimpleGrid>
          </Stack>
        </Form>
      )}
    </Formik>
  );
}
