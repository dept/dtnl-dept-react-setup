import {
  Button,
  Modal as ChakraModal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  ModalProps,
  VisuallyHidden,
} from '@chakra-ui/react';

import CloseLightIcon from '@/icons/components/CloseLight';

export const Modal: React.FC<ModalProps> = ({ onClose, isOpen, children, ...modalProps }) => {
  return (
    <ChakraModal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size="xl"
      blockScrollOnMount={false}
      {...modalProps}
    >
      <ModalOverlay />
      <ModalContent bgColor="white" position="relative">
        <Button onClick={onClose} variant="icon" position="absolute" right="-10px" top="-10px">
          <VisuallyHidden>Close modal</VisuallyHidden>
          <CloseLightIcon />
        </Button>

        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </ChakraModal>
  );
};
