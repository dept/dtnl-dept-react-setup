import { chakra, IconProps, ResponsiveValue } from '@chakra-ui/react';
import { forwardRef } from 'react';
interface CustomIconProps extends IconProps {
  size?: ResponsiveValue<number | string>;
}
const ArrowIcon = forwardRef<SVGSVGElement, CustomIconProps>(({ size, ...props }, svgRef) => {
  if (size) {
    props.width = size;
    props.height = size;
  }

  return (
    <chakra.svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31 22" ref={svgRef} {...props}>
      <path
        fill="currentColor"
        d="M2.703 11.58l8.832 9.058-.716.698-10-10.256 10-10.257.716.699-8.832 9.058h27.78v1H2.703z"
      />
    </chakra.svg>
  );
});
export default ArrowIcon;
