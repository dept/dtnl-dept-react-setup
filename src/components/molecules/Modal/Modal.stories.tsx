import { withKnobs } from '@storybook/addon-knobs';
import React from 'react';

import { Button } from '@/components/atoms/Button';
import { Box } from '@/components/atoms/Grid';

import { Modal } from './Modal';
import { useModal } from './modalStore';

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
  const { show } = useModal('storybook');
  return <Button onClick={() => show()}>{children}</Button>;
};

export const component = () => {
  return (
    <Modal id="storybook">
      <Box p={50}>Content of modal</Box>
    </Modal>
  );
};
