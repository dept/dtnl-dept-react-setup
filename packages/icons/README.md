Place all your svg icons in this folder.

Run `yarn svgr` to optimize them with SVGO and export to React Components. The icon will inherit the color from it's parent.

Usage:

```
import { HomeIcon } from '@dept/icons'
import { rem } from 'polished';

<Box color="primary">
  <HomeIcon boxSize={rem(20)}  />
</Box>
```
