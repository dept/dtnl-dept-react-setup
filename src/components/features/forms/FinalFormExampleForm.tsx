'use-client';

import { Button, Heading, SimpleGrid, Stack } from '@chakra-ui/react';
import { FieldArray } from 'react-final-form-arrays';
import { HiOutlineMail } from 'react-icons/hi';

import { FinalForm, FinalFormProps } from '@/components/shared/FinalForm/FinalForm';
import { FormCheckboxGroup } from '@/components/shared/FinalForm/FormCheckboxGroup';
import { FormDate } from '@/components/shared/FinalForm/FormDate';
import { FormInput } from '@/components/shared/FinalForm/FormInput';
import { FormNumberFormat } from '@/components/shared/FinalForm/FormNumberFormat';
import { FormRadioGroup } from '@/components/shared/FinalForm/FormRadioGroup';
import { FormSelect } from '@/components/shared/FinalForm/FormSelect';
import { Option } from '@/components/shared/Form';

interface ProgrammingLanguageFieldsProps {
  index: number;
  onRemove: () => void;
}

function ProgrammingLanguageFields({ index, onRemove }: ProgrammingLanguageFieldsProps) {
  return (
    <SimpleGrid columns={{ base: 1, md: 3 }} gap="md">
      <FormInput label="Name" name={`programmingLanguages[${index}].name`} required />
      <FormInput
        label="Years experience"
        type="number"
        name={`programmingLanguages[${index}].years`}
        required
      />
      <Button onClick={onRemove}>Remove</Button>
    </SimpleGrid>
  );
}

type FinalFormExampleFormProps = FinalFormProps<any> & {
  countries: Option[];
  languages: Option[];
  animals: Option[];
  initialProgrammingLanguage: any;
};

export function FinalFormExampleForm({
  initialProgrammingLanguage,
  countries,
  languages,
  animals,
  ...props
}: FinalFormExampleFormProps) {
  return (
    <FinalForm {...props}>
      {({ form }) => (
        <Stack spacing={4}>
          <Heading as="h2" fontSize="xl">
            General
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing="md">
            <FormInput
              name="firstname"
              label="First name"
              placeholder="First name"
              required
              clearable
            />

            <FormInput name="lastname" label="Last name" placeholder="Last name" required />
            <FormInput
              start={<HiOutlineMail />}
              type="email"
              name="email"
              label="Email"
              placeholder="E-mail"
              required
              clearable
            />

            <FormDate
              name="dob"
              label="Date of birth"
              placeholder="Date of birth"
              required
              clearable
            />
            <FormSelect
              name="country"
              label="Country"
              options={countries}
              placeholder="Choose country"
              required
            />
            <FormInput
              name="phoneNumber"
              label="Phone number"
              type="tel"
              placeholder="+31 06 12 34 56 78"
              required
            />
            <FormNumberFormat
              prefix="€"
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
          <FormCheckboxGroup name="languages" options={languages} direction="horizontal" required />

          <Heading as="h3" fontSize="md">
            Programming languages
          </Heading>
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

                  <Button width="200px" onClick={() => fields.push(initialProgrammingLanguage)}>
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
          <FormRadioGroup name="favoriteAnimal" required options={animals} direction="horizontal" />

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing="md">
            <Button variant="secondary" onClick={() => form.reset()}>
              Reset
            </Button>
            <Button type="submit">Submit</Button>
          </SimpleGrid>
        </Stack>
      )}
    </FinalForm>
  );
}
