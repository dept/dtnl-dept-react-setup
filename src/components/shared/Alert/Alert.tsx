import { css } from '@chakra-ui/styled-system';
import { HiCheckCircle, HiExclamation, HiInformationCircle, HiXCircle } from 'react-icons/hi';

import { Box, BoxProps, Flex } from '../Grid';
import { Heading, Paragraph } from '../Text';

const colors = {
  succes: {
    bg: 'green.50',
    color: 'green.700',
    icon: HiCheckCircle,
  },
  warning: {
    bg: 'yellow.50',
    color: 'yellow.700',
    icon: HiExclamation,
  },
  info: {
    bg: 'blue.50',
    color: 'blue.700',
    icon: HiInformationCircle,
  },
  error: {
    bg: 'red.50',
    color: 'red.700',
    icon: HiXCircle,
  },
};

type AlertProps = Omit<BoxProps, 'type'> & {
  type: keyof typeof colors;
  title?: string;
  icon?: any;
};

export function Alert({ type, title, children, icon, ...props }: AlertProps) {
  const theme = colors[type];
  const Icon = icon || theme.icon;

  return (
    <Box p="1rem" borderRadius="5px" bg={theme.bg} color={theme.color} {...props}>
      <Flex alignItems="center">
        <Flex>
          <Icon size={20} />
        </Flex>
        <Box ml={3}>
          {title && <Heading as="h3">{title}</Heading>}
          {children && <Paragraph m={0}>{children}</Paragraph>}
        </Box>
      </Flex>
    </Box>
  );
}
