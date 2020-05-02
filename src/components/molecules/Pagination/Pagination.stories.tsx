import { number } from '@storybook/addon-knobs'
import React from 'react'

import { Pagination } from './Pagination'

export default { title: 'Molecules|Pagination', component: Pagination }

export const example = () => {
  return (
    <Pagination
      current={number('Current page', 6)}
      total={number('Amount of content', 74)}
      perPage={number('Items per page', 10)}
      onNavigate={val => console.log(val)}
    />
  )
}
