import { render } from '@test/utils';

import { Hyperlink } from './Hyperlink';

test('it renders', () => {
  render(<Hyperlink href="#"></Hyperlink>);
});
