import { FC } from 'react';

import { Box } from '../Grid';

interface LoaderProps {
  size?: number;
}

export const Loader: FC<LoaderProps> = ({ size = 100 }) => (
  <Box textAlign="center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{ margin: 'auto' }}
      width={size}
      height={size}
      display="block"
      preserveAspectRatio="xMidYMid"
      viewBox="0 0 100 100">
      <circle
        cx="50"
        cy="50"
        r="27"
        fill="none"
        stroke="currentColor"
        strokeDasharray="127.23450247038662 44.411500823462205"
        strokeWidth="7">
        <animateTransform
          attributeName="transform"
          dur="1s"
          keyTimes="0;1"
          repeatCount="indefinite"
          type="rotate"
          values="0 50 50;360 50 50"></animateTransform>
      </circle>
    </svg>
  </Box>
);
