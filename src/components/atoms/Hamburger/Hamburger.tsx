import styled, { css } from 'styled-components'

const HAMBURGER_PADDING_X = 10
const HAMBURGER_PADDING_Y = 10
const HAMBURGER_LAYER_WIDTH = 30
const HAMBURGER_LAYER_HEIGHT = 1
const HAMBURGER_LAYER_SPACING = 6
const HAMBURGER_LAYER_COLOR = '#FFF'
const HAMBURGER_LAYER_BORDER_RADIUS = 0
const HAMBURGER_HOVER_OPACITY = 0.7
const HAMBURGER_ACTIVE_LAYER_COLOR = HAMBURGER_LAYER_COLOR
const HAMBURGER_ACTIVE_HOVER_OPACITY = HAMBURGER_HOVER_OPACITY

interface HamburgerProps {
  onClick: () => void
  isActive: boolean
}

const squeezeInnerStyles = css`
  transition-duration: 0.075s;
  transition-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);

  &::before {
    transition: top 0.075s 0.12s ease, opacity 0.075s ease;
  }

  &::after {
    transition: bottom 0.075s 0.12s ease, transform 0.075s cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }
`
const squeezeInnerActiveStyles = css`
  transform: rotate(45deg);
  transition-delay: 0.12s;
  transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);

  &::before {
    top: 0;
    opacity: 0;
    transition: top 0.075s ease, opacity 0.075s 0.12s ease;
  }

  &::after {
    bottom: 0;
    transform: rotate(-90deg);
    transition: bottom 0.075s ease, transform 0.075s 0.12s cubic-bezier(0.215, 0.61, 0.355, 1);
  }
`

const HamburgerInner = styled.div<HamburgerProps>`
  display: block;
  top: 50%;
  margin-top: ${HAMBURGER_LAYER_HEIGHT / -2}px;

  &,
  &::before,
  &::after {
    width: ${HAMBURGER_LAYER_WIDTH}px;
    height: ${HAMBURGER_LAYER_HEIGHT}px;
    background-color: ${HAMBURGER_LAYER_COLOR};
    border-radius: ${HAMBURGER_LAYER_BORDER_RADIUS}px;
    position: absolute;
    transition-property: transform;
    transition-duration: 0.15s;
    transition-timing-function: ease;
  }

  &::before,
  &::after {
    content: '';
    display: block;
  }

  &::before {
    top: ${(HAMBURGER_LAYER_SPACING + HAMBURGER_LAYER_HEIGHT) * -1}px;
  }

  &::after {
    bottom: ${(HAMBURGER_LAYER_SPACING + HAMBURGER_LAYER_HEIGHT) * -1}px;
  }

  ${squeezeInnerStyles}

  ${(props) => (props.isActive ? squeezeInnerActiveStyles : '')}
`

const hamburgerWrapperActive = css`
  &:hover {
    opacity: ${HAMBURGER_ACTIVE_HOVER_OPACITY};
  }

  ${HamburgerInner} {
    &,
    &::before,
    &::after {
      background-color: ${HAMBURGER_ACTIVE_LAYER_COLOR};
    }
  }
`

const HamburgerWrapper = styled.button<HamburgerProps>`
  padding: ${HAMBURGER_PADDING_Y}px ${HAMBURGER_PADDING_X}px;
  display: inline-block;
  cursor: pointer;

  transition-property: opacity, filter;
  transition-duration: 0.15s;
  transition-timing-function: linear;

  font: inherit;
  color: inherit;
  text-transform: none;
  background-color: transparent;
  border: 0;
  margin: 0;
  overflow: visible;
  outline: none;

  &:hover {
    opacity: ${HAMBURGER_HOVER_OPACITY};
  }

  ${(props) => (props.isActive ? hamburgerWrapperActive : '')}
`

const HamburgerBox = styled.div`
  width: ${HAMBURGER_LAYER_WIDTH}px;
  height: ${HAMBURGER_LAYER_HEIGHT * 3 + HAMBURGER_LAYER_SPACING * 2}px;
  display: inline-block;
  position: relative;
`

export const Hamburger: React.FC<HamburgerProps> = (props) => {
  return (
    <HamburgerWrapper {...props}>
      <HamburgerBox>
        <HamburgerInner {...props} />
      </HamburgerBox>
    </HamburgerWrapper>
  )
}
