import { chakra } from '@chakra-ui/system';
import * as React from 'react';
interface CustomIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}
const SVGIcon = React.forwardRef(
  ({ size, ...props }: CustomIconProps, svgRef: React.ForwardedRef<SVGSVGElement>) => {
    if (size) {
      props.width = size;
      props.height = size;
    }

    return (
      <svg
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
      </svg>
    );
  },
);
const DotIcon = chakra(SVGIcon);
export default DotIcon;
