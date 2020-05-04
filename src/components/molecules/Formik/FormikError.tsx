import { ErrorMessage } from 'formik'
import React from 'react'

import { Box, Text } from '@/components/atoms'
import { colors } from '@/theme/colors'

interface FormikErrorProps {
  name: string
}

export const FormikError: React.FC<FormikErrorProps> = ({ name }) => {
  return (
    <Box mt={1}>
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
