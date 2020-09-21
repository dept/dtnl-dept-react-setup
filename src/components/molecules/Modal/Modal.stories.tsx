import { withKnobs } from '@storybook/addon-knobs';
import React from 'react';

import { Button } from '@/components/atoms/Button';
import { Box } from '@/components/atoms/Grid';
import { useModalActions } from '@/context/ModalContext';

import { Modal } from './Modal';

export default {
  title: 'Molecules/Modal',
  decorators: [
    withKnobs,
    (storyFn: any) => {
      return (
        <>
          <ModalButton>Open modal</ModalButton>
          {storyFn()}
        </>
      );
    },
  ],
  component: Modal,
};

const ModalButton: React.FC = ({ children }) => {
  const modalActions = useModalActions();
  return <Button onClick={() => modalActions.show('storybook')}>{children}</Button>;
};

export const component = () => {
  return (
    <Modal id="storybook">
      <Box p={50}>Content of modal</Box>
    </Modal>
  );
};
