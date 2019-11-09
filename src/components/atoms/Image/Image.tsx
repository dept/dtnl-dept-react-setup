import 'lazysizes'

import { ImgHTMLAttributes } from 'react'
import styled, { css } from 'styled-components'

type LazyLoadAnimation = 'blur' | 'fade'

type StyledImgProps = {
  objectFit?: boolean
  srcset?: string
}

type ImageProps = ImgHTMLAttributes<HTMLImageElement> &
  StyledImgProps & {
    src?: string
    srcSet?: string
    preload?: string
    alt: string
    animate?: LazyLoadAnimation
  }

const objectFitStyles = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const StyledImg = styled.img<StyledImgProps>`
  display: block;
  ${props => (props.objectFit ? objectFitStyles : '')};

  &.blur {
    filter: blur(5px);
    opacity: 0;
    transition: filter 400ms, opacity 400ms;
    &.lazyloaded {
      opacity: 1;
      -webkit-filter: blur(0);
      filter: blur(0);
    }
  }

  &.fade {
    opacity: 0;
    &.lazyloaded {
      opacity: 1;
      transition: opacity 300ms;
    }
  }
`

// WORK IN PROGRESS; Please submit a PR if you improve this
export const Image: React.FC<ImageProps> = ({
  src,
  srcSet,
  alt,
  preload,
  animate = 'blur',
  ...props
}) => {
  return (
    <StyledImg
      {...props}
      src={preload}
      data-sizes="auto"
      data-src={src}
      data-srcset={srcSet}
      alt={alt}
      className={`lazyload ${animate}`}
    />
  )
}
