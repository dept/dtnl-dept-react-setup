import { Box, Button } from '@chakra-ui/react';
import { withKnobs } from '@storybook/addon-knobs';
import { forwardRef, PropsWithChildren } from 'react';

import { Modal } from './Modal';
import { useModal } from './modalStore';

export default {
  title: 'Molecules/Modal',
  decorators: [withKnobs],
  component: Modal,
};

const ModalButton = ({ children, id }: PropsWithChildren<{ id: string }>) => {
  const { show } = useModal(id);
  return <Button onClick={() => show()}>{children}</Button>;
};

export const example = () => {
  return (
    <>
      <ModalButton id="storybook">Open modal</ModalButton>
      <Modal id="storybook">
        <Box p={50}>Content of modal</Box>
      </Modal>
    </>
  );
};

export const custom = () => {
  return (
    <>
      <ModalButton id="storybook2">Open modal</ModalButton>
      <Modal
        id="storybook2"
        contentComponent={forwardRef<any, any>(({ isShown, ...props }, ref) => (
          <Box
            {...props}
            sx={{
              p: 10,
              bg: 'red.100',
              outline: 'none',
              transition: `opacity 300ms`,
              transitionTimingFunction: `cubic-bezier(0.77, 0, 0.175, 1)`,
              opacity: isShown ? 1 : 0,
              width: '500px',
              my: '100px',
              mx: 'auto',
              position: 'relative',
            }}
            ref={ref}
          />
        ))}
      >
        Test
      </Modal>
    </>
  );
};
