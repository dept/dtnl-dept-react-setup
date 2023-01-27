const fs = require('fs');
const path = require('path');
const util = require('util');

const tokensPath = path.resolve(__dirname, 'tokens');
const themePath = path.resolve(__dirname, 'src/theme');

fs.readFile(`${tokensPath}/tokens.json`, 'utf8', (err, data) => {
  if (err) return console.log(`Whoops... Something went wrong: ${err}`);

  const tokens = JSON.parse(data);
  const colors = Object.entries(tokens.color).reduce(
    (acc, [key, obj]) => ({
      ...acc,
      [key.split(' ').join('_').toLocaleLowerCase()]:
        'value' in obj
          ? obj.value
          : Object.entries(obj).reduce(
              (nestedAcc, [nestedKey, nestedObj]) => ({
                ...nestedAcc,
                [nestedKey.split(' ').join('_').toLocaleLowerCase()]: nestedObj.value,
              }),
              {},
            ),
    }),
    {},
  );

  fs.writeFile(
    `${themePath}/colors.ts`,
    `import { ChakraTheme } from '@chakra-ui/react';
    export const colors: ChakraTheme['colors']  = ${util.inspect(colors, false, 2, false)}`,
    err => {
      console.log(
        err ? `Whoops... Something went wrong: ${err}` : 'Successfully converted design tokens!',
      );
    },
  );
});
