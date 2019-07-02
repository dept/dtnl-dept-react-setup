import '@reach/dialog/styles.css'

import { DialogContent, DialogOverlay } from '@reach/dialog'
import { Box } from '@tpdewolf/styled-system'
import React, { FC } from 'react'
import { animated, useSpring, useTransition } from 'react-spring/web.cjs'
import styled from 'styled-components'

import { IconButton } from '@/components/atoms'
import { colors } from '@/theme/colors'
import { media } from '@/utils/media'

interface Props {
  isOpen?: boolean
  isClosable?: boolean
  onDismiss?: () => void
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

  ${media.min('tablet')} {
    margin: 100px auto 10vh;
    width: 1024px;
    max-width: 90%;
  }
`

const AnimatedContent = animated(Content)

export const Modal: FC<Props> = ({ children, isOpen = false, isClosable = true, onDismiss }) => {
  const contentTransition = useSpring({
    transform: isOpen ? 'translate3d(0, 0px, 0)' : 'translate3d(0, 40px, 0)',
  })

  const overlayTransitions = useTransition(isOpen, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: {
      duration: 200,
    },
  })

  return (
    <>
      {overlayTransitions.map(
        ({ item, key, props }) =>
          item && (
            <AnimatedOverlay key={key} onClick={onDismiss} style={props}>
              <AnimatedContent style={contentTransition}>
                {isClosable && (
                  <Box top={0} right={0} zIndex={99} position="absolute" p={['xs', 'xs', 's']}>
                    <IconButton
                      aria-label="Sluiten"
                      onClick={onDismiss}
                      size={25}
                      icon="closeLight"
                    />
                  </Box>
                )}
                {children}
              </AnimatedContent>
            </AnimatedOverlay>
          ),
      )}
    </>
  )
}
