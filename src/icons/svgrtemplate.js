function template({ template }, _opts, { componentName, jsx }) {
  const typeScriptTpl = template.smart({ plugins: ['typescript'] });

  componentName.name = componentName.name.slice(3) + 'Icon';

  return typeScriptTpl.ast`
  import { chakra } from '@chakra-ui/system';
  import * as React from 'react';

  interface CustomIconProps extends React.SVGProps<SVGSVGElement> {
    size?: number
  }

  const SVGIcon = React.forwardRef(({ size, ...props }: CustomIconProps, svgRef: React.ForwardedRef<SVGSVGElement>) => {
    if (size) {
      props.width = size;
      props.height = size;
    }

    return (${jsx});
  })

  const ${componentName} = chakra(SVGIcon);

  export default ${componentName};
`;
}
module.exports = template;
