function template({ template }, opts, { imports, componentName, props, jsx, exports }) {
  const typeScriptTpl = template.smart({ plugins: ['typescript'] });

  componentName.name = componentName.name.slice(3) + 'Icon';

  return typeScriptTpl.ast`
  import React from 'react';

  interface CustomIconProps extends React.SVGProps<SVGSVGElement> {
    size: number
  }

  const ${componentName} = ({ size, ...props }: CustomIconProps) => {
    if (size) {
      props.width = size;
      props.height = size;
    }

    return (${jsx})
  };

  export default ${componentName}
`;
}
module.exports = template;
