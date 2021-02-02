import { DialogContent, DialogOverlay } from '@reach/dialog';
import React, { FC, forwardRef, useEffect, useState } from 'react';
import { Transition } from 'react-transition-group';

import { Button } from '@/components/atoms/Button';
import { Box, BoxProps } from '@/components/atoms/Grid';
import { IconButton } from '@/components/atoms/IconButton';
import { Heading } from '@/components/atoms/Text';
import CloseLightIcon from '@/icons/components/CloseLight';

import { useModal, useModalState } from './modalStore';

type CustomComponentProps = BoxProps & { isShown: boolean };

type CustomComponent = FC<CustomComponentProps>;

interface ModalProps {
  id: string;
  onClose?: () => void;
  width?: string;
  height?: string;
  overlayComponent?: CustomComponent;
  contentComponent?: CustomComponent;
  duration?: number;
}

const Overlay: FC<CustomComponentProps & { duration?: number }> = forwardRef(
  ({ isShown, duration, ...props }, ref) => {
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
  },
);

const Content: FC<CustomComponentProps & { duration?: number }> = forwardRef(
  ({ isShown, width, height, duration, ...props }, ref) => {
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
  duration = 300,
  contentComponent = Content,
  overlayComponent = Overlay,
}) => {
  const { hide } = useModal(id);
  const modal = useModalState(id);
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    setOpen(modal?.isShown || false);
  }, [setOpen, modal]);

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
        exit: duration,
      }}
      unmountOnExit>
      {state => {
        const isShown = state === 'entered';

        return (
          <DialogOverlay
            as={overlayComponent as any}
            {...(modal.isClosable && { onDismiss })}
            isShown={isShown}
            duration={duration}>
            <DialogContent
              as={contentComponent as any}
              isShown={isShown}
              aria-label="Modal"
              width={width}
              height={height}
              duration={duration}>
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
