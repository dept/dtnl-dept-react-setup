import { render } from '@test/utils';
import React from 'react';

import { Skeleton } from './Skeleton';

test('it renders', () => {
  render(
    <>
      <Skeleton></Skeleton>
      <Skeleton></Skeleton>
      <Skeleton></Skeleton>
      <Skeleton></Skeleton>
    </>,
  );
});
