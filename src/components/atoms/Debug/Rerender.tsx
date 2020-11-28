import React, { useRef } from 'react';

export const RenderCount = () => {
  const renders = useRef(0);

  return <>Rerender count: {++renders.current}</>;
};
