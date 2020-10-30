import React from 'react';
import NumberFormat, { NumberFormatProps } from 'react-number-format';

import { FieldInput, FieldInputProps } from './FieldInput';

export type FieldNumberFormatProps = Omit<FieldInputProps, 'type'> & NumberFormatProps;

export const FieldNumberFormat: React.FC<FieldNumberFormatProps> = props => {
  return <NumberFormat customInput={FieldInput} {...props} />;
};
