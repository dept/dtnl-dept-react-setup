import { Button, ButtonProps, VisuallyHidden } from '@chakra-ui/react';
import { StoryFn } from '@storybook/react';

import { HeartFilledIcon } from '@dept/icons';

export default {
  title: 'Chakra Components/Button',
  component: Button,
  argTypes: {
    onClick: {
      action: 'submitted',
    },
  },
};

const Template: StoryFn<ButtonProps> = args => <Button {...args}>Click me!</Button>;

export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: 'secondary',
};

export const Link = Template.bind({});
Link.args = {
  variant: 'link',
};

export const IconTemplate: StoryFn<ButtonProps> = _args => (
  <Button variant="icon">
    <HeartFilledIcon />
    <VisuallyHidden>Click me!</VisuallyHidden>
  </Button>
);
