import { Box } from '@/components/atoms/Grid';

export const Footer: React.FC = () => {
  return (
    <Box
      textAlign="center"
      as="footer"
      bg="gray.300"
      color="gray.700"
      fontWeight="bold"
      py={3}
      px={8}>
      Footer
    </Box>
  );
};
