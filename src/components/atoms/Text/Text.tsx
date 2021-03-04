import { useTheme } from '@chakra-ui/system';
import { HTMLAttributes, FC, forwardRef } from 'react';

import { textVariants } from '@/theme';

import { Box, BoxProps } from '../Grid/Box';

export type TextProps = BoxProps &
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

export const Text = forwardRef<any, TextProps>(({ variant, ...props }, ref) => {
  const theme = useTheme();
  const textVariant = variant && theme.textVariants[variant];

  return (
    <Box
      sx={{
        margin: 0,
        ...textVariant,
      }}
      {...props}
      ref={ref}
    />
  );
});

export const Paragraph = Text;
export const Heading: FC<HeadingProps> = props => <Text {...props} />;

Heading.defaultProps = {
  as: 'h2',
};

Text.defaultProps = {
  as: 'span',
};

Paragraph.defaultProps = {
  as: 'p',
};
