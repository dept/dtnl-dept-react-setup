import { useTheme } from '@chakra-ui/system';
import { forwardRef, ReactElement } from 'react';

import { Box, BoxProps } from '../Grid';

type ButtonElements = 'button' | 'a' | 'span';

interface IconButtonProps {
  as?: ButtonElements;
  'aria-label': string;
  icon: ReactElement;
  selected?: boolean;
  disabled?: boolean;
  size?: BoxProps['width'];
  type?: string;
  hideOutline?: boolean;
}

interface ConditionalProps {
  as: ButtonElements;
  type?: 'submit' | 'button' | 'reset';
}

export const IconButton = forwardRef<any, IconButtonProps & BoxProps>((props, ref) => {
  const { as = 'button', size = 50, icon, hideOutline, ...rest } = props;

  const theme = useTheme();
  const conditionalProps: ConditionalProps = { as };
  if (as === 'button') {
    conditionalProps.type = 'button';
  }

  return (
    <Box
      {...conditionalProps}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        borderRadius: '50%',
        border: 'none',
        bg: 'transparent',
        width: size,
        height: size,
      }}
      _focus={{
        outline: 'none',
        boxShadow: !hideOutline ? theme.shadows.outline : 'none',
        bg: 'rgba(0,0,0,.05)',
      }}
      _hover={{
        bg: 'rgba(0,0,0,.05)',
      }}
      {...rest}
      ref={ref}>
      {icon}
    </Box>
  );
});
