import React from 'react';

import { render } from '@test/utils';

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
