import React from 'react';

import { Box, Column, Grid, Row } from '@/components/atoms';

export default { title: 'Grid/Grid' };

const GridExampleBox: React.FC = props => (
  <Box bg="primary" my={1} color="white" p={4} fontSize={14} {...props} />
);

export const example = () => (
  <Grid>
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
  </Grid>
);

example.story = {
  parameters: {
    info: 'More information: https://styled-system.com/getting-started',
  },
};
