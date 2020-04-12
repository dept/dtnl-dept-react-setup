import { render } from '@test/utils'
import React from 'react'

import { Column } from './Column'
import { Grid } from './Grid'
import { Row } from './Row'

test('it renders', () => {
  render(
    <Grid>
      <Row>
        <Column>1</Column>
        <Column>2</Column>
        <Column>3</Column>
        <Column>4</Column>
      </Row>
    </Grid>,
  )
})
