function template({ template }, _opts, { componentName, jsx }) {
  const typeScriptTpl = template.smart({ plugins: ['typescript'] });

  componentName.name = componentName.name.slice(3) + 'Icon';

  return typeScriptTpl.ast`
  import React from 'react';
  import styled from 'styled-components';
  import { compose, color } from 'styled-system';

  interface CustomIconProps extends React.SVGProps<SVGSVGElement> {
    size?: number
  }

  const svgStyles = compose(
    color
  )

  const SVG = ({ size, ...props }: CustomIconProps) => {
    if (size) {
      props.width = size
      props.height = size
    }

    return (${jsx})
  }

  const ${componentName} = styled(SVG)(svgStyles)


  export default ${componentName}
`;
}
module.exports = template;
