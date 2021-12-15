import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useNProgress } from '@tanem/react-nprogress';

import { Image } from '@/components/shared/Image';
import { LoadingBar } from '@/components/shared/Loader/LoadingBar';

const FullScreenWrapper = styled.div(
  ({ theme }) => css`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 999;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: ${theme.colors.gray[50]};
  `,
);

const DefaultWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export type LoaderProps = {
  isAnimating: boolean;
  withLogo?: boolean;
  isFullScreen?: boolean;
};

export const Loader = ({ isAnimating, withLogo, isFullScreen }: LoaderProps) => {
  const Wrapper = isFullScreen ? FullScreenWrapper : DefaultWrapper;
  const { animationDuration, isFinished, progress } = useNProgress({
    isAnimating,
  });

  if (isFinished) return null;

  return (
    <Wrapper>
      {withLogo && <Image w={96} mb={6} src="/logo.png" alt="Dept logo" />}
      <LoadingBar duration={animationDuration} progress={progress * 100} />
    </Wrapper>
  );
};
