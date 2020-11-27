import * as React from 'react';
import styled from 'styled-components';
import { compose, color } from 'styled-system';
interface CustomIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

const SVGIcon = ({ size, ...props }: CustomIconProps) => {
  if (size) {
    props.width = size;
    props.height = size;
  }

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" {...props}>
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
};

const DotIcon = styled(SVGIcon)(compose(color));
export default DotIcon;
