import { FC } from 'react';
import NumberFormat, { NumberFormatProps } from 'react-number-format';

import { FieldInput, FieldInputProps } from './FieldInput';

export type FieldNumberFormatProps = Omit<FieldInputProps, 'type'> & NumberFormatProps;

export const FieldNumberFormat: FC<FieldNumberFormatProps> = props => {
  return <NumberFormat customInput={FieldInput} {...props} />;
};
