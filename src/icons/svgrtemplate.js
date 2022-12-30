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

function template({ template }, _opts, { jsx }) {
  const typeScriptTpl = template.smart({ plugins: ['typescript'] });

  const wrappedJsx = jsxElement(
    jsxOpeningElement(jsxIdentifier('Icon'), [
      ...jsx.openingElement.attributes,
      jsxAttribute(jsxIdentifier('ref'), jsxExpressionContainer(template.ast('svgRef').expression)),
      jsxSpreadAttribute(identifier('props')),
    ]),
    jsxClosingElement(jsxIdentifier('Icon')),
    jsx.children,
    false,
  );

  return typeScriptTpl.ast`
    import { forwardRef, Icon, IconProps } from '@chakra-ui/react';

    export default forwardRef<IconProps, 'svg'>((props, svgRef) => ${wrappedJsx});
`;
}
module.exports = template;
