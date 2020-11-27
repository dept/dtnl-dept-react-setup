import { DialogContent, DialogOverlay } from '@reach/dialog';
import React, { FC, forwardRef } from 'react';
import { Transition } from 'react-transition-group';

import { Button } from '@/components/atoms/Button';
import { Box, BoxProps } from '@/components/atoms/Grid';
import { IconButton } from '@/components/atoms/IconButton';
import { Heading } from '@/components/atoms/Text';
import CloseLightIcon from '@/icons/components/CloseLight';

import { useModal, useModalState } from './modalStore';

const duration = 300;

interface ModalProps {
  id: string;
  onClose?: () => void;
  width?: string;
  height?: string;
}

const Overlay: FC<BoxProps & { isShown: boolean }> = forwardRef(({ isShown, ...props }, ref) => {
  return (
    <Box
      {...props}
      sx={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        overflow: 'auto',
        transitionTimingFunction: `ease-in-out`,
        transition: `background-color ${duration}ms`,
        zIndex: 99,
        backgroundColor: isShown ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0)',
      }}
      ref={ref}
    />
  );
});

const Content: FC<BoxProps & { isShown: boolean }> = forwardRef(
  ({ isShown, width, height, ...props }, ref) => {
    return (
      <Box
        {...props}
        sx={{
          bg: 'white',
          outline: 'none',
          transition: `opacity ${duration}ms, transform ${duration}ms`,
          transitionTimingFunction: `cubic-bezier(0.77, 0, 0.175, 1)`,
          opacity: isShown ? 1 : 0,
          marginTop: ['auto', null],
          width: ['100%', width],
          height: height,
          maxWidth: [null, '90%'],
          my: [null, '100px'],
          mx: [null, 'auto'],
          position: ['fixed', 'relative'],
          bottom: [0, null],
          transform: isShown ? 'translateY(0px)' : 'translateY(40px)',
        }}
        ref={ref}
      />
    );
  },
);

export const Modal: FC<ModalProps> = ({
  children,
  id,
  onClose,
  width = '500px',
  height = 'auto',
}) => {
  const { hide } = useModal(id);
  const modal = useModalState(id);

  const isOpen = modal?.isShown || false;

  const onDismiss = () => {
    hide();

    if (onClose) {
      setTimeout(onClose, duration);
    }
  };

  const onConfirm = () => {
    if (modal.callback) {
      modal.callback();
    }

    onDismiss();
  };

  return (
    <Transition
      in={isOpen}
      timeout={{
        enter: 0,
        exit: 300,
      }}
      unmountOnExit>
      {state => {
        const isShown = state === 'entered';

        return (
          <DialogOverlay as={Overlay} onDismiss={onDismiss} isShown={isShown}>
            <DialogContent
              as={Content as any}
              isShown={isShown}
              aria-label="Modal"
              width={width}
              height={height}>
              {modal && (
                <>
                  {modal.isClosable && (
                    <Box top={0} right={0} zIndex={99} position="absolute" p={4}>
                      <IconButton
                        aria-label="Close"
                        onClick={onDismiss}
                        size={20}
                        icon={CloseLightIcon}
                      />
                    </Box>
                  )}

                  {modal.title && <Heading>{modal.title}</Heading>}

                  {modal.content}

                  {children}

                  {modal.callback && modal.callbackLabel && (
                    <Button onClick={onConfirm}>{modal.callbackLabel}</Button>
                  )}
                </>
              )}
            </DialogContent>
          </DialogOverlay>
        );
      }}
    </Transition>
  );
};
