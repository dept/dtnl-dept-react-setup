import React from 'react'
import { useInView } from 'react-intersection-observer'
import styled from 'styled-components'

export interface RevealProps {}

interface RevealWrapperProps {
  inView: boolean
}

const RevealWrapper = styled.div<RevealWrapperProps>`
  position: relative;
  transition: opacity 300ms, top 700ms;
  opacity: ${props => (props.inView ? 1 : 0)};
  top: ${props => (props.inView ? '0px' : '-15px')};
`

export const Reveal: React.FC<RevealProps> = ({ children }) => {
  const [ref, inView] = useInView({
    /* Optional options */
    threshold: 0,
    triggerOnce: true,
  })

  return (
    <RevealWrapper ref={ref} inView={inView}>
      {children}
    </RevealWrapper>
  )
}
