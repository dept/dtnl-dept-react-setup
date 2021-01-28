import { FC, HTMLAttributes } from 'react';
import { HiCheckCircle, HiExclamation, HiInformationCircle, HiXCircle } from 'react-icons/hi';

import { classNames } from '@/utils/classNames';

import { Box, Flex } from '../Grid';
import { Heading, Paragraph } from '../Text';
import styles from './Alert.module.scss';

type AlertProps = HTMLAttributes<any> & {
  type: keyof typeof states;
  title?: string;
  icon?: any;
};

const states = {
  success: {
    icon: HiCheckCircle,
  },
  warning: {
    icon: HiExclamation,
  },
  info: {
    icon: HiInformationCircle,
  },
  error: {
    icon: HiXCircle,
  },
};

export const Alert: FC<AlertProps> = ({ className, type, title, children, icon, ...props }) => {
  const classes = classNames(className, styles.alert, styles[`alert--${type}`]);
  const Icon = states[type].icon;

  return (
    <div className={classes} {...props}>
      <Flex alignItems="center">
        <Flex>
          <Icon size={20} />
        </Flex>
        <Box ml={3}>
          {title && <Heading as="h3">{title}</Heading>}
          {children && <Paragraph m={0}>{children}</Paragraph>}
        </Box>
      </Flex>
    </div>
  );
};
