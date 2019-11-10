import { DialogContent, DialogOverlay } from '@reach/dialog'
import { Box, Heading } from '@tpdewolf/styled-primitives'
import React, { FC } from 'react'
import { CSSTransition } from 'react-transition-group'
import styled from 'styled-components'

import { Button, IconButton } from '@/components/atoms'
import { useModal } from '@/context/ModalContext'
import { colors } from '@/theme/colors'
import { media } from '@/utils/media'

const duration = 300

interface ModalProps {
  id: string
}

const Overlay = styled(DialogOverlay)<{ isShown: boolean }>`
  background: hsla(0, 0%, 0%, 0.33);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  z-index: 99;
  transition: opacity ${duration}ms 50ms;
  transition-timing-function: cubic-bezier(0.77, 0, 0.175, 1);
  opacity: ${props => (props.isShown ? 1 : 0)};
`

const Content = styled(DialogContent)`
  width: 100%;
  margin-top: auto;
  background: ${colors.white};
  outline: none;
  padding: 0px;
  position: absolute;
  bottom: 0;
  transition: opacity ${duration}ms, transform ${duration}ms;
  transition-timing-function: cubic-bezier(0.77, 0, 0.175, 1);

  ${media.min('tablet')} {
    position: relative;
    margin: 100px auto 10vh;
    width: 1024px;
    max-width: 90%;
  }

  &.modal-appear {
    opacity: 0;
    transform: translateY(40px);
  }
  &.modal-appear-active {
    opacity: 1;
    transform: translateY(0);
  }
  &.modal-exit {
    opacity: 1;
    transform: translateY(0);
  }
  &.modal-exit-active {
    opacity: 0;
    transform: translateY(40px);
  }
`

export const Modal: FC<ModalProps> = ({ children, id }) => {
  const modalStore = useModal()
  const modal = modalStore.getModal(id)

  const onDismiss = () => {
    modalStore.hide(id)
  }

  const onConfirm = () => {
    if (modal.callback) {
      modal.callback()
    }

    onDismiss()
  }

  return (
    <CSSTransition in={modal && modal.isShown} timeout={duration} classNames="modal" unmountOnExit>
      <div>
        <Overlay onDismiss={onDismiss} isShown={Boolean(modal && modal.isShown)}>
          <CSSTransition in={modal && modal.isShown} appear timeout={duration} classNames="modal">
            <Content aria-label={(modal && modal.title) || 'Dialog'}>
              {modal && (
                <>
                  {modal.isClosable && (
                    <Box top={0} right={0} zIndex={99} position="absolute" p={['xs', 'xs', 's']}>
                      <IconButton
                        aria-label="Close"
                        onClick={onDismiss}
                        size={25}
                        icon="closeLight"
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
            </Content>
          </CSSTransition>
        </Overlay>
      </div>
    </CSSTransition>
  )
}
