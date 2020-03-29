import { Box, Heading } from '@tpdewolf/styled-primitives'
import React, { FC } from 'react'
import ReactModal from 'react-modal'
import { createGlobalStyle } from 'styled-components'

import { Button, IconButton } from '@/components/atoms'
import { useModalActions, useModalState } from '@/context/ModalContext'
import { colors } from '@/theme/colors'
import { media } from '@/utils/media'

const duration = 300

interface ModalProps {
  id: string
  onClose?: () => void
  width?: string
  height?: string
}

const ModalStyles = createGlobalStyle<any>`
  .ReactModal__Overlay {
    background-color: rgba(0, 0, 0, 0.3);
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
    transition: opacity ${duration}ms 50ms;
    transition-timing-function: cubic-bezier(0.77, 0, 0.175, 1);
    z-index: 99;

    &--after-open {
      opacity: 1;
    }

    &--before-close {
      opacity: 0;
    }
  }

  .ReactModal__Content {
    width: 100%;
    margin-top: auto;
    background: ${colors.white};
    outline: none;
    padding: 0px;
    position: fixed;
    bottom: 0;
    transition: opacity ${duration}ms, transform ${duration}ms;
    transition-timing-function: cubic-bezier(0.77, 0, 0.175, 1);
    opacity: 0;
    transform: translateY(40px);

    ${media.min('tablet')} {
      position: relative;
      width: ${props => props.width};
      height: ${props => props.height};
      margin: 100px auto 100px;
      max-width: 90%;
    }

    &--after-open {
      opacity: 1;
      transform: translateY(0);
    }

    &--before-close {
      opacity: 0;
      transform: translateY(40px);
    }
  }
`

export const Modal: FC<ModalProps> = ({
  children,
  id,
  onClose,
  width = '500px',
  height = 'auto',
}) => {
  const modalActions = useModalActions()
  const modalState = useModalState()

  const modal = modalState.getModal(id)

  const onDismiss = () => {
    modalActions.hide(id)

    if (onClose) {
      setTimeout(onClose, duration)
    }
  }

  const onConfirm = () => {
    if (modal.callback) {
      modal.callback()
    }

    onDismiss()
  }

  return (
    <>
      <ModalStyles width={width} height={height}></ModalStyles>
      <ReactModal
        className="c-modal__content"
        overlayClassName="c-modal__overlay"
        closeTimeoutMS={duration}
        isOpen={Boolean(modal && modal.isShown)}
        contentLabel="Modal"
        onRequestClose={onDismiss}>
        {modal && (
          <>
            {modal.isClosable && (
              <Box top={0} right={0} zIndex={99} position="absolute" p={['xs', 'xs', 's']}>
                <IconButton aria-label="Close" onClick={onDismiss} size={22} icon="CloseLight" />
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
      </ReactModal>
    </>
  )
}
