import React from 'react';
import { useField } from 'react-final-form';

import { Box } from '@/components/atoms/Grid';
import { Text } from '@/components/atoms/Text';
import { colors } from '@/theme/colors';

interface FinalFormErrorProps {
  name: string;
}

export const FinalFormError: React.FC<FinalFormErrorProps> = ({ name }) => {
  const { meta } = useField(name);

  return (
    <Box mt={1}>
      <Text display="block" fontSize="xxxs" color={colors.error}>
        {meta.error}
      </Text>
    </Box>
  );
};
