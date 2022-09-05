import { chakra, IconProps, ResponsiveValue } from '@chakra-ui/react';
import { forwardRef } from 'react';
interface CustomIconProps extends IconProps {
  size?: ResponsiveValue<number | string>;
}
const CalenderIcon = forwardRef<SVGSVGElement, CustomIconProps>(({ size, ...props }, svgRef) => {
  if (size) {
    props.width = size;
    props.height = size;
  }

  return (
    <chakra.svg
      xmlns="http://www.w3.org/2000/svg"
      width={18}
      height={17}
      viewBox="0 0 18 17"
      ref={svgRef}
      {...props}
    >
      <g fill="none" fillRule="evenodd" stroke="currentColor">
        <rect width={17} height={16} x={0.5} y={0.5} rx={3} />
        <path fill="currentColor" d="M.5 6.5h17v1H.5zm4-6h1v3h-1zm9 0h1v3h-1z" />
      </g>
    </chakra.svg>
  );
});
export default CalenderIcon;
