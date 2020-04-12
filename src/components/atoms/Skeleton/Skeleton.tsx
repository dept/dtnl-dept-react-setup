import { Component, ReactNode } from 'react'
import styled, { keyframes } from 'styled-components'

const defaultBaseColor = '#eee'

const defaultHighlightColor = '#f5f5f5'

const skeletonKeyframes = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`

const SkeletonElement = styled.span`
  background-color: ${defaultBaseColor};
  background-image: linear-gradient(
    90deg,
    ${defaultBaseColor},
    ${defaultHighlightColor},
    ${defaultBaseColor}
  );
  background-size: 200px 100%;
  background-repeat: no-repeat;
  border-radius: 4px;
  display: inline-block;
  line-height: 1;
  width: 100%;
  animation: ${skeletonKeyframes} 1.2s ease-in-out infinite;
`

interface Props {
  count?: number
  duration?: number
  width?: string
  wrapper?: ReactNode
  height?: string
  circle?: boolean
}

export class Skeleton extends Component<Props> {
  static defaultProps = {
    count: 1,
    duration: 1.2,
    width: null,
    wrapper: null,
    height: null,
    circle: false,
  }

  render() {
    const { count = 1 } = this.props

    const elements = []
    for (let i = 0; i < count; i++) {
      const style: any = {}
      if (this.props.width != null) {
        style.width = this.props.width
      }
      if (this.props.height != null) {
        style.height = this.props.height
      }
      if (this.props.width !== null && this.props.height !== null && this.props.circle) {
        style.borderRadius = '50%'
      }
      elements.push(
        <SkeletonElement key={i} style={style}>
          &zwnj;
        </SkeletonElement>,
      )
    }

    const Wrapper: any = this.props.wrapper

    return (
      <span>
        {Wrapper
          ? elements.map((element, i) => (
              <Wrapper key={i}>
                {element}
                &zwnj;
              </Wrapper>
            ))
          : elements}
      </span>
    )
  }
}
