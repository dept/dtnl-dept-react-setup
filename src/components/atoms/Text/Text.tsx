import React, { HTMLAttributes } from 'react';
import { useTheme } from 'styled-components';
import { TypographyProps } from 'styled-system';

import { textVariants } from '@/theme';

import { Box, BoxProps } from '../Grid/Box';

export type TextProps = BoxProps &
  TypographyProps &
  HTMLAttributes<HTMLParagraphElement> &
  HTMLAttributes<HTMLLabelElement> & {
    as?:
      | 'p'
      | 'small'
      | 'strong'
      | 'em'
      | 'span'
      | 'h1'
      | 'h2'
      | 'h3'
      | 'h4'
      | 'h5'
      | 'h6'
      | 'label';
    target?: string;
    variant?: keyof typeof textVariants;
  };

export type HeadingProps = TextProps &
  HTMLAttributes<HTMLHeadingElement> & {
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  };

export const Text = React.forwardRef<any, TextProps>(({ variant, ...props }, ref) => {
  const theme = useTheme();
  const textVariant = variant && theme.textVariants[variant];

  return (
    <Box
      sx={{
        ...textVariant,
      }}
      {...props}
      ref={ref}
    />
  );
});

export const Paragraph = Text;
export const Heading: React.FC<HeadingProps> = props => <Text {...props} />;

Heading.defaultProps = {
  as: 'h2',
};

Text.defaultProps = {
  as: 'span',
};

Paragraph.defaultProps = {
  as: 'p',
};
