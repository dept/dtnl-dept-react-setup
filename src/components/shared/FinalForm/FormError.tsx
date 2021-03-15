import { useField } from 'react-final-form';

import { Box } from '@/components/shared/Grid';
import { Text } from '@/components/shared/Text';
import { colors } from '@/theme/colors';

interface FormErrorProps {
  name: string;
}

export const FormError = ({ name }: FormErrorProps) => {
  const { meta } = useField(name);

  const showError = meta.error && meta.touched;

  if (!showError) {
    return null;
  }

  return (
    <Box mt={1}>
      <Text display="block" fontSize="xxxs" color={colors.error}>
        {meta.error}
      </Text>
    </Box>
  );
};
