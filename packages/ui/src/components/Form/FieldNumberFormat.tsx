import { NumericFormat, NumericFormatProps } from 'react-number-format';

import { FieldInput, FieldInputProps } from './FieldInput';

export type FieldNumberFormatProps = Omit<FieldInputProps, 'type'> & NumericFormatProps<any>;

export const FieldNumberFormat = (props: FieldNumberFormatProps) => {
  return <NumericFormat customInput={FieldInput} {...props} />;
};
