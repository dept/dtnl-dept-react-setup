import { useState } from 'react';
import { Cookies } from 'react-cookie';

import { Button } from '../Button';
import { Box, Grid, Row, Column, Flex } from '../Grid';
import { Text } from '../Text';
import { CookiesConfig } from './CookiesConfig';
import { acceptCookies, dismissCookies } from './helpers';

export const CookiesBar = () => {
  const cookies = new Cookies();
  const [visible, setVisible] = useState(!cookies.get(`${CookiesConfig.prefix}accepted`));

  function handleAcceptCookies() {
    acceptCookies();
    setVisible(false);
  }

  return (
    <>
      {visible && (
        <Box bg="white" bottom={0} position="fixed" py={4} width="100%">
          <Grid>
            <Row>
              <Column col={12}>
                <Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam laoreet a nisi
                  eget dignissim. Vestibulum augue tellus, convallis tristique massa eu, iaculis
                  blandit lectus. Fusce aliquam lectus purus, sit amet imperdiet nulla tincidunt id.
                </Text>
                <Flex flexWrap="wrap" gridGap={4}>
                  <Button onClick={dismissCookies} variant="secondary" w={['100%', 'auto']}>
                    Cookie settings
                  </Button>
                  <Button onClick={handleAcceptCookies} variant="primary" w={['100%', 'auto']}>
                    Accept
                  </Button>
                </Flex>
              </Column>
            </Row>
          </Grid>
        </Box>
      )}
    </>
  );
};
