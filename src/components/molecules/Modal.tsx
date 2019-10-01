import { DialogContent, DialogOverlay } from '@reach/dialog'
import { Box, Heading } from '@tpdewolf/styled-primitives'
import React, { FC } from 'react'
import { animated, useTransition } from 'react-spring/web.cjs'
import styled from 'styled-components'

import { Button, IconButton } from '@/components/atoms'
import { useModal } from '@/context/ModalContext'
import { colors } from '@/theme/colors'
import { media } from '@/utils/media'

interface ModalProps {
  id: string
}

const Overlay = styled(DialogOverlay)`
  background: hsla(0, 0%, 0%, 0.33);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  z-index: 99;
`

const AnimatedOverlay = animated(Overlay)

const Content = styled(DialogContent)`
  width: 95%;
  margin: 3vw auto;
  background: ${colors.white};
  outline: none;
  padding: 0px;
  position: relative;

  ${media.min('tablet')} {
    margin: 100px auto 10vh;
    width: 1024px;
    max-width: 90%;
  }
`

export const Modal: FC<ModalProps> = ({ children, id }) => {
  const transitionDuration = 200

  const modalStore = useModal()
  const modal = modalStore.getModal(id)

  const contentTransitions = useTransition(modal && modal.isShown, null, {
    from: { transform: 'translate3d(0, 40px, 0)' },
    enter: { transform: 'translate3d(0, 0, 0)' },
    leave: { transform: 'translate3d(0, 40px, 0)' },
    config: {
      duration: transitionDuration,
    },
  })

  const overlayTransitions = useTransition(modal && modal.isShown, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: {
      duration: transitionDuration,
    },
  })

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
    <>
      {modal &&
        overlayTransitions.map(
          overlayTransition =>
            overlayTransition.item && (
              <AnimatedOverlay
                style={overlayTransition.props}
                key={overlayTransition.key}
                onDismiss={onDismiss}>
                {contentTransitions.map(
                  contentTransition =>
                    contentTransition.item && (
                      <animated.div style={contentTransition.props} key={contentTransition.key}>
                        <Content>
                          {modal.isClosable && (
                            <Box
                              top={0}
                              right={0}
                              zIndex={99}
                              position="absolute"
                              p={['xs', 'xs', 's']}>
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
                        </Content>
                      </animated.div>
                    ),
                )}
              </AnimatedOverlay>
            ),
        )}
    </>
  )
}
