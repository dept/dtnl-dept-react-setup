import { chakra } from '@chakra-ui/system';
import * as React from 'react';
interface CustomIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}
const SVGIcon = React.forwardRef(({ size, ...props }: CustomIconProps, svgRef: any) => {
  if (size) {
    props.width = size;
    props.height = size;
  }

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" ref={svgRef} {...props}>
      <path
        fill="currentColor"
        d="M9 0l2.75 6 6.25.5-4.833 4.5 1.416 6.083-5.75-3.167-5.416 3.167 1.333-6.417L0 6.5l6.5-.75z"
      />
    </svg>
  );
});
const StarFullIcon = chakra(SVGIcon);
export default StarFullIcon;
