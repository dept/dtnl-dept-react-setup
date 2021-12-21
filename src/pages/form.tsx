import { Alert, Box, Divider, Stack } from '@chakra-ui/react';
import { subYears } from 'date-fns';
import { FormApi } from 'final-form';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { useState } from 'react';
import { object, string, date, array, number } from 'yup';

import { FinalFormExampleForm } from '@/components/features/forms/FinalFormExampleForm';
import { FormikExampleForm } from '@/components/features/forms/FormikExampleForm';
import { FieldRadioGroup } from '@/components/shared/Form';
import { SubmitHandler } from '@/components/shared/Formik/types';

type FFSubmitHandler<FormValues> = (values: FormValues, formHelpers: FormApi<FormValues>) => void;

const languages = [
  {
    value: 'en',
    label: 'English',
  },
  {
    value: 'nl',
    label: 'Dutch',
  },
  {
    value: 'de',
    label: 'German',
  },
  {
    value: 'fr',
    label: 'French',
  },
];

const countries = [
  {
    value: 'nl',
    label: 'The Netherlands',
  },
  {
    value: 'de',
    label: 'Germany',
  },
  {
    value: 'uk',
    label: 'United Kingdom',
  },
];

const animals = [
  {
    value: 'dog',
    label: 'Dog',
  },
  {
    value: 'cat',
    label: 'Cat',
  },
  {
    value: 'chicken',
    label: 'Chicken',
  },
  {
    value: 'fish',
    label: 'Fish',
  },
];

interface ProgrammingLanguageValues {
  name: string;
  years: number | undefined;
}

type FormValues = {
  firstname: string;
  lastname: string;
  country: string;
  phoneNumber: string;
  email: string;
  dob: Date | null;
  languages: string[];
  favoriteAnimal: string;
  programmingLanguages: ProgrammingLanguageValues[];
};

const initialProgrammingLanguage: ProgrammingLanguageValues = {
  name: '',
  years: undefined,
};

const initialValues: FormValues = {
  firstname: '',
  lastname: '',
  email: '',
  country: '',
  phoneNumber: '',
  dob: null,
  languages: [],
  programmingLanguages: [],
  favoriteAnimal: '',
};

/**
 * https://github.com/jquense/yup
 */
const validationSchema = object({
  firstname: string().label('First name').required(),
  lastname: string().label('Last name').required(),
  email: string().email().label('E-mail').required(),
  dob: date()
    .typeError('Must be a valid date')
    .label('Date of birth')
    .max(subYears(new Date(), 18), 'You need to be 18 years or older')
    .required(),
  phoneNumber: string().label('Phone number').required(),
  country: string().label('Country').required(),
  languages: array(string()).label('Languages').min(1),
  programmingLanguages: array(
    object({
      name: string().label('Name').required(),
      years: number().label('Years').min(0).required(),
    }),
  )
    .label('Programming languages')
    .required(),
  favoriteAnimal: string().label('Favorite animal').required(),
});

type FormLib = 'final-form' | 'formik';

const Page: NextPage = () => {
  const [formLib, setFormLib] = useState<FormLib>('final-form');

  const finalFormSubmitHandler: FFSubmitHandler<FormValues> = (values, helpers) => {
    console.log(values, helpers);
  };

  const formikSubmitHandler: SubmitHandler<FormValues> = (values, helpers) => {
    console.log(values, helpers);
  };

  function renderForm() {
    switch (formLib) {
      case 'final-form':
        return (
          <FinalFormExampleForm
            onSubmit={finalFormSubmitHandler}
            validationSchema={validationSchema}
            initialValues={initialValues}
            initialProgrammingLanguage={initialProgrammingLanguage}
            animals={animals}
            languages={languages}
            countries={countries}
          />
        );
      case 'formik':
        return (
          <FormikExampleForm
            onSubmit={formikSubmitHandler}
            validationSchema={validationSchema}
            initialValues={initialValues}
            initialProgrammingLanguage={initialProgrammingLanguage}
            animals={animals}
            languages={languages}
            countries={countries}
          />
        );
    }
  }

  return (
    <>
      <NextSeo title="Form example" description="Page description" />

      <Box py={10}>
        <Stack space={10}>
          <Alert type="warning">
            {`Two form libraries are supported. Final form (recommended) and Formik. The api's are really
        similar. When you've decided to which library you'd like to use, make sure you the delete
        the other library's dependencies and components.`}
          </Alert>

          <FieldRadioGroup
            direction="horizontal"
            name="formLib"
            options={[
              {
                value: 'final-form',
                label: 'Final form',
              },
              {
                value: 'formik',
                label: 'Formik',
              },
            ]}
            value={formLib}
            onChange={(e: any) => {
              setFormLib(e.currentTarget.value);
            }}
          />

          <Divider />

          {renderForm()}
        </Stack>
      </Box>
    </>
  );
};

export default Page;
