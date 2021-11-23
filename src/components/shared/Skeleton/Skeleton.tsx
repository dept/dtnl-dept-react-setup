import { keyframes } from '@chakra-ui/system';
import styled from '@emotion/styled';
import { ReactNode } from 'react';

const defaultBaseColor = '#eee';

const defaultHighlightColor = '#f5f5f5';

const skeletonKeyframes = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

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
`;

interface SkeletonProps {
  count?: number;
  duration?: number;
  width?: string;
  wrapper?: ReactNode;
  height?: string;
  circle?: boolean;
}

export const Skeleton = (props: SkeletonProps) => {
  const { count = 1, width, height, circle = false, wrapper = null } = props;

  const elements = [];
  for (let i = 0; i < count; i++) {
    const style: any = {};
    if (width != null) {
      style.width = width;
    }
    if (height != null) {
      style.height = height;
    }
    if (width !== null && height !== null && circle) {
      style.borderRadius = '50%';
    }
    elements.push(
      <SkeletonElement key={i} style={style}>
        &zwnj;
      </SkeletonElement>,
    );
  }

  const Wrapper: any = wrapper;

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
  );
};
