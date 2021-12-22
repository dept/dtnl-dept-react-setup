import { Button, VisuallyHidden } from '@chakra-ui/react';

import ArrowIcon from '@/icons/components/Arrow';

export default { title: 'Chakra Components/Buttons', component: null };

export const buttons = () => (
  <>
    <Button>Click me!</Button>
    <br />
    <Button variant="secondary">No me!!</Button>
    <br />
    <Button variant="link">No me!!</Button>
    <br />
    <Button variant="icon">
      <ArrowIcon />
      <VisuallyHidden>Click me!</VisuallyHidden>
    </Button>
  </>
);
