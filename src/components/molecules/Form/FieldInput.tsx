import CloseLightIcon from '@public/icons/components/CloseLight';
import React, { InputHTMLAttributes, useState } from 'react';
import styled, { useTheme } from 'styled-components';

import { Box, BoxProps } from '@/components/atoms/Grid';
import { IconButton } from '@/components/atoms/IconButton';
import { Label } from '@/components/atoms/Label';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: 'text' | 'textarea' | 'number' | 'password' | 'email' | 'tel';
  color?: string;
  inputRef?: any;
  clearable?: boolean;
  hasError?: boolean;
  readonly?: boolean;
  onClear?: () => void;
  start?: string | number | JSX.Element;
  end?: string | number | JSX.Element;
}

export type FieldInputProps = InputProps & {
  label?: string;
  name: string;
};

const Input = React.forwardRef<any, InputProps>(({ hasError, color, ...props }, ref) => {
  let additionalProps: any = {};

  if (props.readOnly) {
    additionalProps = {
      ...additionalProps,
      opacity: '0.3',
      userSelect: 'none',
      cursor: 'not-allowed',
    };
  }

  if (hasError) {
    additionalProps = {
      ...additionalProps,
      color: 'error',
    };
  }

  return (
    <Box
      ref={ref}
      as="input"
      sx={{
        width: '100%',
        height: '100%',
        backgroundColor: 'transparent',
        border: 'none',
        margin: '0',
        color: color || 'black',
        padding: '12px 14px',
        ["&[type='number']::-webkit-inner-spin-button, &[type='number']::-webkit-outer-spin-button"]: {
          appearance: 'none',
          margin: 0,
        },
        '&:focus': {
          outline: 'none',
        },
        ...additionalProps,
      }}
      {...props}
    />
  );
});

type InputWrapperProps = InputProps & { hasFocus?: boolean };

export const InputWrapper: React.FC<InputWrapperProps> = ({ hasFocus, hasError, ...props }) => {
  const theme = useTheme();

  let additionalProps: any = {};

  if (hasFocus) {
    additionalProps = {
      ...additionalProps,
      outline: 'none',
      boxShadow: theme.shadows.outline || 'inherit',
      borderColor: 'gray.300',
    };
  }

  if (hasError) {
    additionalProps = {
      ...additionalProps,
      color: 'error',
      borderColor: 'error',
    };
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        border: '1px solid',
        borderColor: 'gray.200',
        borderRadius: '5px',
        height: '42px',
        position: 'relative',
        transition: 'all 0.3s ease',
        overflow: 'hidden',
        ...additionalProps,
      }}
      {...props}
    />
  );
};

const AdornmentWrapper: React.FC<BoxProps> = props => (
  <Box
    minWidth={40}
    display="flex"
    alignItems="center"
    justifyContent="center"
    px={2}
    height="100%"
    flex="1"
    bg="grey.lighter"
    {...props}
  />
);

const Clear: React.FC<any> = ({ onClick }) => {
  return (
    <Box display="flex" alignItems="center" justifyContent="center" px={3} height="100%" flex="1">
      <IconButton
        type="button"
        aria-label="Clear"
        icon={CloseLightIcon}
        size={15}
        onClick={onClick}
      />
    </Box>
  );
};

const FieldInputWrapper: React.FC<{ isFloating: boolean }> = ({ isFloating, children }) => {
  if (isFloating) {
    // TODO: create floating logic
  }

  return <Box position="relative">{children}</Box>;
};

export const FieldInput: React.FC<FieldInputProps> = ({
  label,
  name,
  color,
  type,
  clearable,
  onClear,
  start,
  end,
  hasError,
  onBlur,
  onFocus,
  onChange,
  inputRef,
  ...props
}) => {
  const initFloat = Boolean(
    props.value !== undefined ||
      props.defaultValue !== undefined ||
      start !== undefined ||
      end !== undefined,
  );
  const initHasValue = Boolean(props.value !== undefined || props.defaultValue !== undefined);
  const [hasValue, setHasValue] = useState(initHasValue);
  const [hasFocus, setHasFocus] = useState(false);

  const shouldFloat = initFloat || hasValue || hasFocus;

  return (
    <FieldInputWrapper isFloating={shouldFloat}>
      {label && (
        <Label htmlFor={name} color={color}>
          {label}
        </Label>
      )}
      <InputWrapper color={color} hasFocus={hasFocus} hasError={hasError}>
        {start && <AdornmentWrapper>{start}</AdornmentWrapper>}
        <Input
          type={type}
          hasError={hasError}
          {...props}
          id={name}
          ref={inputRef}
          onChange={e => {
            const { value } = e.currentTarget;
            setHasValue(Boolean(value));
            if (onChange) onChange(e);
          }}
          onBlur={e => {
            setHasFocus(false);
            if (onBlur) onBlur(e);
          }}
          onFocus={e => {
            setHasFocus(true);
            if (onFocus) onFocus(e);
          }}
        />
        {clearable && hasValue && <Clear onClick={onClear} />}
        {end && <AdornmentWrapper>{end}</AdornmentWrapper>}
      </InputWrapper>
    </FieldInputWrapper>
  );
};
