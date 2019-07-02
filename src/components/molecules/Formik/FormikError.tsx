import { Box, Text } from '@tpdewolf/styled-primitives'
import { ErrorMessage } from 'formik'

import { colors } from '@/theme/colors'

interface FormikErrorProps {
  name: string
}

export const FormikError: React.FC<FormikErrorProps> = ({ name }) => {
  return (
    <Box mt={5}>
      <ErrorMessage
        name={name}
        render={(message: string) => {
          return (
            <Text display="block" fontSize="xxxs" color={colors.error}>
              {message}
            </Text>
          )
        }}
      />
    </Box>
  )
}
