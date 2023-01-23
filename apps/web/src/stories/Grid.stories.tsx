import { Box, BoxProps, Container, SimpleGrid } from '@chakra-ui/react';

export default { title: 'Grid/Grid' };

function GridExampleBox(props: BoxProps) {
  return <Box bg="primary" my={1} color="white" p={4} fontSize={14} {...props} />;
}

export function FlexGrid() {
  return (
    <Container>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 10, md: 30 }}>
        <GridExampleBox>1</GridExampleBox>
        <GridExampleBox>2</GridExampleBox>

        <GridExampleBox>3</GridExampleBox>
      </SimpleGrid>
    </Container>
  );
}
