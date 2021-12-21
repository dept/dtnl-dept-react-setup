import { Box, Button, useDisclosure } from '@chakra-ui/react';
import { withKnobs } from '@storybook/addon-knobs';

import { Modal } from './Modal';

export default {
  title: 'Molecules/Modal',
  decorators: [withKnobs],
  component: Modal,
};

export const Example = () => {
  const modalDisclose = useDisclosure();
  return (
    <>
      <Button variant="secondary" onClick={modalDisclose.onOpen}>
        Open modal
      </Button>
      <Modal {...modalDisclose}>
        <Box p={50}>Content of modal</Box>
      </Modal>
    </>
  );
};
