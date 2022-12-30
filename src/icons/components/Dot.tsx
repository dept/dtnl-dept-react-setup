import { Icon, IconProps } from '@chakra-ui/react';
import { forwardRef } from 'react';
const SvgDot = forwardRef<SVGSVGElement, IconProps>((props, svgRef) => (
  <Icon
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    ref={svgRef}
    {...props}>
    <circle
      cx={8}
      cy={10}
      r={8}
      fill="currentColor"
      fillRule="evenodd"
      transform="translate(0 -2)"
    />
  </Icon>
));
export default SvgDot;
