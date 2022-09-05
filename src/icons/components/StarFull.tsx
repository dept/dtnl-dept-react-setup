import { chakra, IconProps, ResponsiveValue } from '@chakra-ui/react';
import { forwardRef } from 'react';
interface CustomIconProps extends IconProps {
  size?: ResponsiveValue<number | string>;
}
const StarFullIcon = forwardRef<SVGSVGElement, CustomIconProps>(({ size, ...props }, svgRef) => {
  if (size) {
    props.width = size;
    props.height = size;
  }

  return (
    <chakra.svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" ref={svgRef} {...props}>
      <path
        fill="currentColor"
        d="M9 0l2.75 6 6.25.5-4.833 4.5 1.416 6.083-5.75-3.167-5.416 3.167 1.333-6.417L0 6.5l6.5-.75z"
      />
    </chakra.svg>
  );
});
export default StarFullIcon;
