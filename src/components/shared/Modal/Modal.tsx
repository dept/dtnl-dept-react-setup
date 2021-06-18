import { chakra } from '@chakra-ui/system';
import styled from '@emotion/styled';
import { DialogContent as DContent, DialogOverlay } from '@reach/dialog';
import { AnimatePresence } from 'framer-motion';
import React, { forwardRef, ReactNode, useEffect } from 'react';
import FocusLock from 'react-focus-lock';

import { Button } from '@/components/shared/Button';
import { Flex, BoxProps } from '@/components/shared/Grid';
import { IconButton } from '@/components/shared/IconButton';
import { Heading } from '@/components/shared/Text';
import { colors } from '@/theme/colors';

import { MotionBox } from '../MotionBox';
import { useModal, useModalState } from './modalStore';
import { CloseNormal } from '@/icons/components';

const DialogContent = chakra(DContent);

type CustomComponentProps = BoxProps & { isShown: boolean; duration?: number };

interface ModalProps {
  id: string;
  onOpen?: () => void;
  onClose?: () => void;
  width?: string;
  height?: string;
  maxWidth?: string;
  maxHeight?: string;
  p?: any;
  sx?: BoxProps;
  buttonProps?: BoxProps;
  overlayComponent?: React.ForwardRefExoticComponent<CustomComponentProps>;
  contentComponent?: React.ForwardRefExoticComponent<CustomComponentProps>;
  duration?: number;
  delay?: number;
  children?: ReactNode;
  title?: string;
  callback?: () => void;
  callbackLabel?: string;
}

const Overlay = forwardRef<any, CustomComponentProps>(({ duration, delay, ...props }, ref) => {
  return (
    <MotionBox
      initial={{
        backgroundColor: 'rgba(0, 0, 0, 0)',
        opacity: 0,
        transition: {
          delay,
          delayChildren: delay,
        },
      }}
      animate={{
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        opacity: 1,
      }}
      exit={{
        backgroundColor: 'rgba(0, 0, 0, 0)',
        opacity: 0,
      }}
      transition={{
        duration,
        ease: 'easeInOut',
      }}
      {...props}
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'auto',
        zIndex: 99,
      }}
      ref={ref}
    />
  );
});

const Content = forwardRef<any, CustomComponentProps & { duration?: number }>(
  ({ width, height, duration, sx, ...props }, ref) => {
    return (
      <MotionBox
        initial={{
          opacity: 0,
          x: '-50%',
          y: 'calc(-50% + 40px)',
        }}
        animate={{
          opacity: 1,
          y: '-50%',
        }}
        exit={{
          opacity: 0,
          x: '-50%',
          y: 'calc(-50% + 40px)',
        }}
        transition={{
          duration,
          ease: 'easeOut',
        }}
        {...props}
        sx={{
          bg: colors.white,
          outline: 'none',
          width: width as any,
          height: height,
          maxWidth: {
            base: 'calc(100% - 32px)',
            xs: 'calc(100% - 48px)',
          },
          maxHeight: 'calc(100% - 96px)',
          overflow: 'auto',
          position: 'fixed',
          top: '50%',
          left: '50%',
          textAlign: 'center',
          ...sx,
        }}
        ref={ref}
      />
    );
  },
);

export const CloseButton = styled(IconButton)`
  border-radius: 50%;
  overflow: hidden;
  transition: transform ease-in-out 150ms;

  &:hover,
  &:focus {
    transform: scale(1.125);
    opacity: 1;
  }
`;

export const Modal = ({
  children,
  id,
  onOpen,
  onClose,
  width = '100%',
  height = 'auto',
  duration = 0.3,
  delay = 0,
  maxWidth = '1280px',
  maxHeight,
  p,
  sx,
  buttonProps: { sx: buttonPropsSx, ...buttonProps } = {},
  contentComponent = Content,
  overlayComponent = Overlay,
  title: _title,
  callback: _callback,
  callbackLabel: _callbackLabel,
}: ModalProps) => {
  const { hide } = useModal(id);
  const modal = useModalState(id);

  const isOpen = modal?.isShown || false;

  const title = modal?.title || _title;
  const callback = modal?.callback || _callback;
  const callbackLabel = modal?.callbackLabel || _callbackLabel;

  useEffect(() => {
    if (isOpen) onOpen && onOpen();
  }, [isOpen, onOpen]);

  const onDismiss = () => {
    hide();

    if (onClose) {
      setTimeout(onClose, duration * 1000);
    }
  };

  const onConfirm = () => {
    if (callback) {
      callback();
    }

    onDismiss();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        // @ts-ignore
        <DialogOverlay
          as={overlayComponent as any}
          onDismiss={modal.isClosable ? onDismiss : undefined}
          duration={duration}
          delay={delay}>
          <FocusLock returnFocus={true}>
            {/* @ts-ignore */}
            <DialogContent
              as={contentComponent as any}
              aria-label="Modal"
              width={width}
              height={height}
              maxWidth={maxWidth}
              maxHeight={maxHeight}
              duration={duration}
              onClick={e => e.stopPropagation()}
              p={p || { base: '40px 24px', md: '64px' }}
              backgroundColor={colors.primary}
              color={colors.white}
              sx={sx}>
              {modal && (
                <>
                  {modal.isClosable && (
                    <Button
                      title={'close'}
                      variant="round"
                      top={{ base: '40px', md: '64px' }}
                      right={{ base: '24px', md: '64px' }}
                      sx={{
                        zIndex: 2,
                        position: 'absolute',
                        width: '46px',
                        height: '46px',
                        border: '2px solid rgba(255,255,255, 0.2)',
                        ...buttonPropsSx,
                      }}
                      // eslint-disable-next-line jsx-a11y/no-autofocus
                      autoFocus
                      onClick={onDismiss}
                      {...buttonProps}>
                      <Flex w="42px" h="42px" justifyContent="center" alignItems="center">
                        <CloseNormal color="white" size={12} />
                      </Flex>
                    </Button>
                  )}

                  {title && (
                    <Heading fontSize="40px" lineHeight={1} mb="24px">
                      {title}
                    </Heading>
                  )}

                  {modal.content}

                  {children}

                  {callback && callbackLabel && (
                    <Button onClick={onConfirm}>{callbackLabel}</Button>
                  )}
                </>
              )}
            </DialogContent>
          </FocusLock>
        </DialogOverlay>
      )}
    </AnimatePresence>
  );
};
