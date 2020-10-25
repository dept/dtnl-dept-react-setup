import { SystemCssProperties } from '@styled-system/css';
import dynamic from 'next/dynamic';
import React, { InputHTMLAttributes, useState } from 'react';
import { HiOutlineX } from 'react-icons/hi';
import { Props as MaskProps } from 'react-input-mask';
import { useTheme } from 'styled-components';

import { Box, BoxProps } from '@/components/atoms/Grid';
import { IconButton } from '@/components/atoms/IconButton';
import { Label } from '@/components/atoms/Label';

const InputMask = dynamic(() => import('react-input-mask'));

type InputProps = InputHTMLAttributes<HTMLInputElement> &
  Partial<MaskProps> & {
    type?: 'text' | 'textarea' | 'number' | 'password' | 'email' | 'tel';
    color?: string;
    inputRef?: any;
    clearable?: boolean;
    hasError?: boolean;
    readonly?: boolean;
    onClear?: () => void;
    start?: string | number | JSX.Element;
    end?: string | number | JSX.Element;
    labelProps?: any;
  };

export type FieldInputProps = InputProps & {
  label?: string;
  name: string;
};

export const Input = React.forwardRef<any, InputProps>(
  ({ hasError, color, mask, maskChar = null, start, end, ...props }, ref) => {
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

    const styles: SystemCssProperties = {
      width: '100%',
      height: '100%',
      backgroundColor: 'transparent',
      border: 'none',
      margin: '0',
      color: color || 'black',
      pl: start ? 0 : '12px',
      pr: end ? 0 : '12px',
      py: '14px',
      ["&[type='number']::-webkit-inner-spin-button, &[type='number']::-webkit-outer-spin-button"]: {
        appearance: 'none',
        margin: 0,
      },
      '&:focus': {
        outline: 'none',
      },
      ...additionalProps,
    };

    if (mask) {
      return (
        <InputMask mask={mask} maskChar={maskChar} {...props}>
          {(inputProps: any) => <Box innerRef={ref} as="input" sx={styles} {...inputProps} />}
        </InputMask>
      );
    }

    return <Box ref={ref} as="input" sx={styles} {...props} />;
  },
);

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

export const AdornmentWrapper: React.FC<BoxProps> = props => (
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
        icon={HiOutlineX}
        size={18}
        onClick={onClick}
        tabIndex={-1}
        hideOutline
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

export const FieldInput = React.forwardRef<any, FieldInputProps>(
  (
    {
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
      required,
      value,
      labelProps,
      ...props
    },
    ref,
  ) => {
    const initFloat = Boolean(
      value !== undefined ||
        props.defaultValue !== undefined ||
        start !== undefined ||
        end !== undefined,
    );
    const hasValue = Boolean(
      (value !== undefined && value !== '') ||
        (props.defaultValue !== undefined && props.defaultValue !== ''),
    );

    const [hasFocus, setHasFocus] = useState(false);

    const shouldFloat = initFloat || hasValue || hasFocus;

    return (
      <FieldInputWrapper isFloating={shouldFloat}>
        {label && (
          <Label htmlFor={name} color={color} required={required} {...labelProps}>
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
            start={start}
            end={end}
            name={name}
            ref={ref || inputRef}
            required={required}
            value={value}
            onChange={e => {
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
  },
);
