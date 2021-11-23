/**
 * @jest-environment jsdom
 */
import { render } from '@test/utils';

import { Column } from './Column';
import { Container } from './Container';
import { Row } from './Row';

test('it renders', () => {
  render(
    <Container>
      <Row>
        <Column>1</Column>
        <Column>2</Column>
        <Column>3</Column>
        <Column>4</Column>
      </Row>
    </Container>,
  );
});
