import { SystemCssProperties } from '@styled-system/css';
import dynamic from 'next/dynamic';
import { forwardRef, InputHTMLAttributes, useState, FC } from 'react';
import { HiOutlineX } from 'react-icons/hi';
import { Props as MaskProps } from 'react-input-mask';
import { useTheme } from 'styled-components';

import { Box, BoxProps } from '@/components/atoms/Grid';
import { IconButton } from '@/components/atoms/IconButton';
import { Label } from '@/components/atoms/Label';

import styles from './FieldInput.module.scss';

const InputMask = dynamic(() => import('react-input-mask'));

type InputProps = InputHTMLAttributes<HTMLInputElement> &
  Partial<MaskProps> & {
    type?: 'text' | 'textarea' | 'number' | 'password' | 'email' | 'tel' | 'search';
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

export const Input = forwardRef<any, InputProps>(
  ({ hasError, color, className, mask, maskChar = null, start, end, ...props }, ref) => {
    const classes = [className, styles.input];

    if (hasError) {
      classes.push('has-error');
    }

    if (mask) {
      return (
        <InputMask mask={mask} maskChar={maskChar} {...props}>
          {(inputProps: any) => <input ref={ref} className={styles.input} {...inputProps} />}
        </InputMask>
      );
    }

    return <input ref={ref} className={styles.input} {...props} />;
  },
);

type InputWrapperProps = InputProps & { hasFocus?: boolean };

export const InputWrapper: FC<InputWrapperProps> = ({ hasFocus, hasError, ...props }) => {
  const theme = useTheme();

  let additionalProps: any = {};

  if (hasFocus) {
    additionalProps = {
      ...additionalProps,
      outline: 'none',
      boxShadow: theme?.shadows.outline || 'inherit',
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

export const AdornmentWrapper: FC<BoxProps> = props => (
  <Box
    minWidth={40}
    display="flex"
    alignItems="center"
    justifyContent="center"
    px={2}
    height="100%"
    flex="1"
    bg="gray.50"
    {...props}
  />
);

const Clear: FC<any> = ({ onClick }) => {
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

const FieldInputWrapper: FC<{ isFloating: boolean }> = ({ isFloating, children }) => {
  if (isFloating) {
    // TODO: create floating logic
  }

  return <Box position="relative">{children}</Box>;
};

export const FieldInput = forwardRef<any, FieldInputProps>(
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
