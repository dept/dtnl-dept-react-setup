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
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31 22" {...props}>
      <path
        fill="currentColor"
        d="M2.703 11.58l8.832 9.058-.716.698-10-10.256 10-10.257.716.699-8.832 9.058h27.78v1H2.703z"
      />
    </svg>
  );
};

const ArrowIcon = styled(SVGIcon)(compose(color));
export default ArrowIcon;
