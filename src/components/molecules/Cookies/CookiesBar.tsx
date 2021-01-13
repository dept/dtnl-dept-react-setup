import { useState } from 'react';
import { Cookies } from 'react-cookie';

import { Button } from '@/components/atoms/Button';
import { Box, Column, Grid, Flex, Row } from '@/components/atoms/Grid';
import { Text } from '@/components/atoms/Text';

import { CookiesConfig } from './CookiesConfig';

export const CookiesBar = () => {
  const cookies = new Cookies();
  const [visible, setVisible] = useState(!(cookies.get(`${CookiesConfig.prefix}accepted`) === '1'));

  const AcceptCookies = () => {
    const date = new Date();
    const expires = new Date(date.setDate(date.getDate() + 365));

    cookies.set(`${CookiesConfig.prefix}accepted`, 1, { expires, sameSite: 'lax' });

    CookiesConfig.cookies?.map(cookie => {
      cookies.set(CookiesConfig.prefix + cookie.name, cookie.value, { expires, sameSite: 'lax' });
    });

    setVisible(false);
  };

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
                <Flex flexWrap="wrap">
                  <Button as="a" href="/cookies" mt={4} variant="secondary" w={['100%', 'auto']}>
                    Cookie settings
                  </Button>
                  <Button
                    ml={[0, 4]}
                    mt={4}
                    onClick={AcceptCookies}
                    variant="primary"
                    w={['100%', 'auto']}>
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
