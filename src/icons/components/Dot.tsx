import { chakra, IconProps, ResponsiveValue } from '@chakra-ui/react';
import { forwardRef } from 'react';
interface CustomIconProps extends IconProps {
  size?: ResponsiveValue<number | string>;
}
const DotIcon = forwardRef<SVGSVGElement, CustomIconProps>(({ size, ...props }, svgRef) => {
  if (size) {
    props.width = size;
    props.height = size;
  }

  return (
    <chakra.svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      viewBox="0 0 16 16"
      ref={svgRef}
      {...props}
    >
      <circle
        cx={8}
        cy={10}
        r={8}
        fill="currentColor"
        fillRule="evenodd"
        transform="translate(0 -2)"
      />
    </chakra.svg>
  );
});
export default DotIcon;
