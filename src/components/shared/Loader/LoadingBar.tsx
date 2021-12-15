import { css } from '@emotion/react';
import styled from '@emotion/styled';

const Wrapper = styled.div`
  height: 2px;
  border-radius: 8px;
  width: 100%;
  max-width: 130px;
  background: ${({ theme }) => theme.colors.gray[300]};
`;

const Loader = styled.div<LoadingBarProps>(
  ({ theme, progress, duration }) => css`
    height: 100%;
    border-radius: 8px;
    width: ${progress}%;
    transition: width ${duration}ms linear;
    background: ${theme.colors.black};
  `,
);

interface LoadingBarProps {
  duration: number;
  progress: number;
}

export const LoadingBar = (props: LoadingBarProps) => (
  <Wrapper>
    <Loader {...props} />
  </Wrapper>
);
