import { Box, Column, Contain, Row } from '@tpdewolf/styled-primitives'
import React from 'react'

export default { title: 'Grid|Grid' }

const GridExampleBox: React.FC = props => (
  <Box bg="primary" my={5} color="white" p={20} fontSize={14} {...props} />
)

export const example = () => (
  <Contain>
    <Row gutter={[15, 30]}>
      <Column col={[12, 4]}>
        <GridExampleBox>1</GridExampleBox>
      </Column>
      <Column col={[12, 4]}>
        <GridExampleBox>2</GridExampleBox>
      </Column>
      <Column col={[12, 4]}>
        <GridExampleBox>3</GridExampleBox>
      </Column>
    </Row>
  </Contain>
)

example.story = {
  parameters: {
    info: 'More information: https://styled-system.com/getting-started',
  },
}
