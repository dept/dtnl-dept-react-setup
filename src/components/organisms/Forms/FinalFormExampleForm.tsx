import { subYears } from 'date-fns';
import { FormApi } from 'final-form';
import React from 'react';
import { FieldArray } from 'react-final-form-arrays';
import { HiOutlineMail } from 'react-icons/hi';
import * as Yup from 'yup';

import { Button } from '@/components/atoms/Button';
import { Column, Row, Stack } from '@/components/atoms/Grid';
import { Heading } from '@/components/atoms/Text';
import { FinalForm } from '@/components/molecules/FinalForm/FinalForm';
import { FinalFormCheckboxGroup } from '@/components/molecules/FinalForm/FinalFormCheckboxGroup';
import { FinalFormDate } from '@/components/molecules/FinalForm/FinalFormDate';
import { FinalFormInput } from '@/components/molecules/FinalForm/FinalFormInput';
import { FinalFormRadioGroup } from '@/components/molecules/FinalForm/FinalFormRadioGroup';
import { FinalFormSelect } from '@/components/molecules/FinalForm/FinalFormSelect';

type SubmitHandler<FormValues> = (values: FormValues, formHelpers: FormApi<FormValues>) => void;

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
  email: string;
  dob: string;
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
  dob: '',
  languages: [],
  programmingLanguages: [],
  favoriteAnimal: '',
};

/**
 * https://github.com/jquense/yup
 */
const validationSchema = Yup.object({
  firstname: Yup.string().label('First name').required(),
  lastname: Yup.string().label('Last name').required(),
  email: Yup.string().email().label('E-mail').required(),
  dob: Yup.date()
    .label('Date of birth')
    .max(subYears(new Date(), 18), 'You need to be 18 years or older')
    .required(),
  phoneNumber: Yup.string().label('Phone number').required(),
  country: Yup.string().label('Country').required(),
  languages: Yup.array(Yup.string()).label('Languages').min(1),
  programmingLanguages: Yup.array(
    Yup.object({
      name: Yup.string().label('Name').required(),
      years: Yup.number().label('Years').min(0).required(),
    }),
  )
    .label('Programming languages')
    .required(),
  favoriteAnimal: Yup.string().label('Favorite animal').required(),
});

interface ProgrammingLanguageFieldsProps {
  index: number;
  onRemove: () => void;
}

const ProgrammingLanguageFields: React.FC<ProgrammingLanguageFieldsProps> = ({
  index,
  onRemove,
}) => {
  return (
    <Row>
      <Column col={4}>
        <FinalFormInput label="Name" name={`programmingLanguages[${index}].name`} required />
      </Column>
      <Column col={4}>
        <FinalFormInput
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

export const FinalFormExampleForm: React.FC = () => {
  const submitHandler: SubmitHandler<FormValues> = (values, formHelpers) => {
    console.log(values, formHelpers);
  };

  return (
    <FinalForm<FormValues>
      initialValues={initialValues}
      // validationSchema={validationSchema}
      onSubmit={submitHandler}>
      {({ form }) => (
        <Stack space={4}>
          <Heading>General</Heading>
          <Row>
            <Column col={6}>
              <FinalFormInput
                name="firstname"
                label="First name"
                placeholder="First name"
                required
                clearable
              />
            </Column>
            <Column col={6}>
              <FinalFormInput name="lastname" label="Last name" placeholder="Last name" required />
            </Column>

            <Column col={6}>
              <FinalFormInput
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
              <FinalFormDate
                name="dob"
                label="Date of birth"
                placeholder="Date of birth"
                required
                clearable
              />
            </Column>
            <Column col={6}>
              <FinalFormSelect
                name="country"
                label="Country"
                options={countries}
                placeholder="Choose country"
                required
              />
            </Column>
            <Column col={6}>
              <FinalFormInput
                name="phoneNumber"
                label="Phone number"
                type="tel"
                placeholder="+31 06 12 34 56 78"
                mask="+31 99 99 99 99 99"
                required
              />
            </Column>
          </Row>

          <Heading>Skills</Heading>
          <Heading as="h3">Languages</Heading>
          <FinalFormCheckboxGroup
            name="languages"
            options={languages}
            direction="horizontal"
            required
          />

          <Heading as="h3">Programming languages</Heading>
          <FieldArray name="programmingLanguages">
            {({ fields }) => {
              return (
                <>
                  {fields.map((name, index) => {
                    return (
                      <ProgrammingLanguageFields
                        key={name}
                        index={index}
                        onRemove={() => fields.remove(index)}
                      />
                    );
                  })}

                  <Button onClick={() => fields.push(initialProgrammingLanguage)}>
                    Insert new +
                  </Button>
                </>
              );
            }}
          </FieldArray>

          <Heading>Interests</Heading>
          <Heading as="h3">Favorite animal</Heading>
          <FinalFormRadioGroup
            name="favoriteAnimal"
            required
            options={animals}
            direction="horizontal"
          />

          <Row>
            <Column>
              <Button variant="secondary" onClick={() => form.reset()}>
                Reset
              </Button>
            </Column>
            <Column>
              <Button type="submit">Submit</Button>
            </Column>
          </Row>
        </Stack>
      )}
    </FinalForm>
  );
};
