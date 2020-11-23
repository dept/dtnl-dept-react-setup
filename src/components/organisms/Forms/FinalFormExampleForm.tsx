import { FC } from 'react';
import { FieldArray } from 'react-final-form-arrays';
import { HiOutlineMail } from 'react-icons/hi';

import { Button } from '@/components/atoms/Button';
import { Column, Row, Stack } from '@/components/atoms/Grid';
import { Heading } from '@/components/atoms/Text';
import { FinalForm, FinalFormProps } from '@/components/molecules/FinalForm/FinalForm';
import { FormCheckboxGroup } from '@/components/molecules/FinalForm/FormCheckboxGroup';
import { FormDate } from '@/components/molecules/FinalForm/FormDate';
import { FormInput } from '@/components/molecules/FinalForm/FormInput';
import { FormNumberFormat } from '@/components/molecules/FinalForm/FormNumberFormat';
import { FormRadioGroup } from '@/components/molecules/FinalForm/FormRadioGroup';
import { FormSelect } from '@/components/molecules/FinalForm/FormSelect';
import { Option } from '@/components/molecules/Form';

interface ProgrammingLanguageFieldsProps {
  index: number;
  onRemove: () => void;
}

const ProgrammingLanguageFields: FC<ProgrammingLanguageFieldsProps> = ({ index, onRemove }) => {
  return (
    <Row>
      <Column col={4}>
        <FormInput label="Name" name={`programmingLanguages[${index}].name`} required />
      </Column>
      <Column col={4}>
        <FormInput
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

export const FinalFormExampleForm: FC<FinalFormExampleFormProps> = ({
  initialProgrammingLanguage,
  countries,
  languages,
  animals,
  ...props
}) => {
  console.log(props);

  return (
    <FinalForm {...props}>
      {({ form }) => (
        <Stack space={4}>
          <Heading>General</Heading>
          <Row>
            <Column col={6}>
              <FormInput
                name="firstname"
                label="First name"
                placeholder="First name"
                required
                clearable
              />
            </Column>
            <Column col={6}>
              <FormInput name="lastname" label="Last name" placeholder="Last name" required />
            </Column>

            <Column col={6}>
              <FormInput
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
              <FormDate
                name="dob"
                label="Date of birth"
                placeholder="Date of birth"
                required
                clearable
              />
            </Column>
            <Column col={6}>
              <FormSelect
                name="country"
                label="Country"
                options={countries}
                placeholder="Choose country"
                required
              />
            </Column>
            <Column col={6}>
              <FormInput
                name="phoneNumber"
                label="Phone number"
                type="tel"
                placeholder="+31 06 12 34 56 78"
                mask="+31 99 99 99 99 99"
                required
              />
            </Column>

            <Column col={6}>
              <FormNumberFormat
                prefix="€"
                label="Money?"
                name="currency"
                placeholder="How much money would you like?"
              />
            </Column>
          </Row>

          <Heading>Skills</Heading>
          <Heading as="h3">Languages</Heading>
          <FormCheckboxGroup name="languages" options={languages} direction="horizontal" required />

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
          <FormRadioGroup name="favoriteAnimal" required options={animals} direction="horizontal" />

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
