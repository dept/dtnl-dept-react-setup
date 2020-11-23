import { ErrorMessage } from 'formik';
import { FC } from 'react';

import { Box } from '@/components/atoms/Grid';
import { Text } from '@/components/atoms/Text';
import { colors } from '@/theme/colors';

interface FormikErrorProps {
  name: string;
}

export const FormikError: FC<FormikErrorProps> = ({ name }) => {
  return (
    <Box mt={1}>
      <ErrorMessage name={name}>
        {message => {
          return (
            <Text display="block" fontSize="xxxs" color={colors.error}>
              {message}
            </Text>
          );
        }}
      </ErrorMessage>
    </Box>
  );
};
