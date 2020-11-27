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
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22" {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M11 0c6.075 0 11 4.925 11 11s-4.925 11-11 11S0 17.075 0 11 4.925 0 11 0zm1.136 9.664V5.44h-1.792v4.224l.224 2.976h1.344l.224-2.976zm-.896 4.224c-.363 0-.65.104-.864.312-.213.208-.32.483-.32.824 0 .341.107.613.32.816.213.203.501.304.864.304.373 0 .667-.101.88-.304.213-.203.32-.475.32-.816 0-.341-.11-.616-.328-.824-.219-.208-.51-.312-.872-.312z"
      />
    </svg>
  );
};

const ErrorIcon = styled(SVGIcon)(compose(color));
export default ErrorIcon;
