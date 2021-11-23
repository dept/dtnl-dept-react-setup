import { ErrorMessage } from 'formik';

import { Box } from '@/components/shared/Grid';
import { Text } from '@/components/shared/Text';
import { colors } from '@/theme/colors';

interface FormikErrorProps {
  name: string;
}

export const FormikError = ({ name }: FormikErrorProps) => {
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
