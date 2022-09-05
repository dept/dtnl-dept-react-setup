import { chakra, IconProps, ResponsiveValue } from '@chakra-ui/react';
import { forwardRef } from 'react';
interface CustomIconProps extends IconProps {
  size?: ResponsiveValue<number | string>;
}
const ChevronIcon = forwardRef<SVGSVGElement, CustomIconProps>(({ size, ...props }, svgRef) => {
  if (size) {
    props.width = size;
    props.height = size;
  }

  return (
    <chakra.svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 9" ref={svgRef} {...props}>
      <path
        fill="currentColor"
        d="M16.566.216a.907.907 0 011.197.019.72.72 0 01-.021 1.086L8.986 9 .268 1.592A.72.72 0 01.228.506.907.907 0 011.424.47l7.544 6.41L16.566.216z"
      />
    </chakra.svg>
  );
});
export default ChevronIcon;
