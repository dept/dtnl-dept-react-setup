import React from 'react';
import { FieldArray } from 'react-final-form-arrays';
import { HiOutlineMail } from 'react-icons/hi';

import { Button } from '@/components/atoms/Button';
import { Column, Row, Stack } from '@/components/atoms/Grid';
import { Heading } from '@/components/atoms/Text';
import { FinalForm, FinalFormProps } from '@/components/molecules/FinalForm/FinalForm';
import { FinalFormCheckboxGroup } from '@/components/molecules/FinalForm/FinalFormCheckboxGroup';
import { FinalFormDate } from '@/components/molecules/FinalForm/FinalFormDate';
import { FinalFormInput } from '@/components/molecules/FinalForm/FinalFormInput';
import { FinalFormRadioGroup } from '@/components/molecules/FinalForm/FinalFormRadioGroup';
import { FinalFormSelect } from '@/components/molecules/FinalForm/FinalFormSelect';
import { Option } from '@/components/molecules/Form';

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

type FinalFormExampleFormProps = FinalFormProps<any> & {
  countries: Option[];
  languages: Option[];
  animals: Option[];
  initialProgrammingLanguage: any;
};

export const FinalFormExampleForm: React.FC<FinalFormExampleFormProps> = ({
  initialProgrammingLanguage,
  countries,
  languages,
  animals,
  ...props
}) => {
  return (
    <FinalForm {...props}>
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
