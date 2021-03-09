import { FC } from 'react';

import { Box, Column, Container, Row, Grid } from '@/components/atoms/Grid';

export default { title: 'Grid/Grid' };

const GridExampleBox: FC = props => (
  <Box bg="primary" my={1} color="white" p={4} fontSize={14} {...props} />
);

export const FlexGrid = () => (
  <Container>
    <Row gap={[15, 30]}>
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
  </Container>
);

export const GridExample = () => {
  return (
    <Grid cols={[2, 3, 4]} gap={4}>
      <GridExampleBox>1</GridExampleBox>
      <GridExampleBox>2</GridExampleBox>
      <GridExampleBox>3</GridExampleBox>
      <GridExampleBox>4</GridExampleBox>
    </Grid>
  );
};
