import { withKnobs } from '@storybook/addon-knobs';
import { useState } from 'react';

import { Button } from '@/components/atoms/Button';
import { Box } from '@/components/atoms/Grid';

import { Collapse } from './Collapse';

export default { title: 'Molecules/Collapse', decorators: [withKnobs], component: Collapse };

export const Component = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setOpen(!open)}>Click to collapse</Button>
      <Collapse isOpen={open}>
        <Box border="2px solid red" p={30}>
          Content to be collapsed
        </Box>
      </Collapse>
    </div>
  );
};
