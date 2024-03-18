import { StoryFn } from '@storybook/react';
import { Image } from './Image';

export default {
  title: 'Foundation/Image',
  component: Image,
  argTypes: {
    objectFit: {
      control: {
        type: 'text',
      },
    },
    width: {
      control: {
        type: 'text',
      },
    },
    height: {
      control: {
        type: 'text',
      },
    },
    src: {
      control: {
        type: 'text',
      },
    },
    srcSet: {
      control: {
        type: 'text',
      },
    },
    alt: {
      control: {
        type: 'text',
      },
    },
  },
};

export const Default: StoryFn<typeof Image> = Image;
Default.args = {
  objectFit: 'cover',
  width: '100%',
  height: '',
  src: 'https://images.unsplash.com/photo-1516125073169-9e3ecdee83e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
  srcSet:
    'https://images.unsplash.com/photo-1516125073169-9e3ecdee83e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=320&q=80 320w, https://images.unsplash.com/photo-1516125073169-9e3ecdee83e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=480&q=80 480w, https://images.unsplash.com/photo-1516125073169-9e3ecdee83e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=768&q=80 768w, https://images.unsplash.com/photo-1516125073169-9e3ecdee83e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1024&q=80 1024w, https://images.unsplash.com/photo-1516125073169-9e3ecdee83e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80 1280w, https://images.unsplash.com/photo-1516125073169-9e3ecdee83e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80 1400w, https://images.unsplash.com/photo-1516125073169-9e3ecdee83e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80 1920w',
  alt: 'Cat picture',
};
