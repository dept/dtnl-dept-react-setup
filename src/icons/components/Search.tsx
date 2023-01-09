import { forwardRef, Icon, IconProps } from '@chakra-ui/react';
export default forwardRef<IconProps, 'svg'>((props, svgRef) => (
  <Icon
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={22}
    viewBox="0 0 22 22"
    ref={svgRef}
    {...props}>
    <g fill="none" fillRule="evenodd" stroke="currentColor" strokeWidth={1.5}>
      <rect width={14.5} height={14.5} x={0.75} y={0.75} rx={7.25} />
      <path d="M13.016 13.07L21 21.055" />
    </g>
  </Icon>
));
