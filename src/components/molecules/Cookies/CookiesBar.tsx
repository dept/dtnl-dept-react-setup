import { useRouter } from 'next/router';
import { useState } from 'react';
import { Cookies } from 'react-cookie';

import { Button } from '@/components/atoms/Button';
import { Box, Column, Flex, Grid, Row } from '@/components/atoms/Grid';
import { Text } from '@/components/atoms/Text';

import { CookiesConfig } from './CookiesConfig';

export const CookiesBar = () => {
  const cookies = new Cookies();
  const date = new Date();
  const expires = new Date(date.setDate(date.getDate() + 365));
  const router = useRouter();
  const [visible, setVisible] = useState(!cookies.get(`${CookiesConfig.prefix}accepted`));

  const AcceptCookies = () => {
    cookies.set(`${CookiesConfig.prefix}accepted`, true, { expires, sameSite: 'lax' });

    CookiesConfig.cookies?.map(cookie => {
      cookies.set(CookiesConfig.prefix + cookie.name, true, { expires, sameSite: 'lax' });
    });

    setVisible(false);
  };

  const DismissCookies = () => {
    cookies.set(`${CookiesConfig.prefix}accepted`, false, { expires, sameSite: 'lax' });

    CookiesConfig.cookies?.map(cookie => {
      cookies.set(CookiesConfig.prefix + cookie.name, cookie.value, { expires, sameSite: 'lax' });
    });

    router.push('/cookies');
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
                  <Button mt={4} onClick={DismissCookies} variant="secondary" w={['100%', 'auto']}>
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
