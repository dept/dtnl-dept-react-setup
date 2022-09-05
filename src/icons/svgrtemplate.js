const {
  identifier,
  jsxExpressionContainer,
  jsxClosingElement,
  jsxAttribute,
  jsxElement,
  jsxIdentifier,
  jsxOpeningElement,
  jsxSpreadAttribute,
} = require('@babel/types');

function template({ template }, _opts, { componentName, jsx }) {
  const typeScriptTpl = template.smart({ plugins: ['typescript'] });

  componentName.name = componentName.name.slice(3) + 'Icon';

  const wrappedJsx = jsxElement(
    jsxOpeningElement(jsxIdentifier('chakra.svg'), [
      ...jsx.openingElement.attributes,
      jsxAttribute(jsxIdentifier('ref'), jsxExpressionContainer(template.ast('svgRef').expression)),
      jsxSpreadAttribute(identifier('props')),
    ]),
    jsxClosingElement(jsxIdentifier('chakra.svg')),
    jsx.children,
    false,
  );

  return typeScriptTpl.ast`
  import { chakra, IconProps, ResponsiveValue } from '@chakra-ui/react';
  import { forwardRef } from 'react';

  interface CustomIconProps extends IconProps {
    size?: ResponsiveValue<number | string>;
  }

  const ${componentName} = forwardRef<SVGSVGElement, CustomIconProps>(({ size, ...props }, svgRef) => {
    if (size) {
      props.width = size;
      props.height = size;
    }

    return ${wrappedJsx};
  })

  export default ${componentName};
`;
}
module.exports = template;
