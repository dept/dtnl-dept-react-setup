import React, { FC } from 'react';
import { HiCheckCircle, HiExclamation, HiInformationCircle, HiXCircle } from 'react-icons/hi';

import { Box, BoxProps, Flex } from '../Grid';
import { Heading, Paragraph } from '../Text';

type AlertProps = BoxProps & {
  type: keyof typeof colors;
  title?: string;
  icon?: any;
};

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

export const Alert: FC<AlertProps> = ({ type, title, children, icon, ...props }) => {
  const theme = colors[type];
  const Icon = icon || theme.icon;

  return (
    <Box p="1rem" borderRadius="5px" bg={theme.bg} color={theme.color} {...props}>
      <Flex alignItems="center">
        <Box display="inline-block">
          <Icon size={20} />
        </Box>
        <Box ml={3}>
          {title && <Heading as="h3">{title}</Heading>}
          {children && <Paragraph m={0}>{children}</Paragraph>}
        </Box>
      </Flex>
    </Box>
  );
};
