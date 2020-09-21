import React from 'react';
interface CustomIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

const ClockIcon = ({ size, ...props }: CustomIconProps) => {
  if (size) {
    props.width = size;
    props.height = size;
  }

  return (
    <svg viewBox="0 0 20 20" {...props}>
      <path d="M10 19.5a9.5 9.5 0 110-19 9.5 9.5 0 010 19zm0-1a8.5 8.5 0 100-17 8.5 8.5 0 000 17z" />
      <path d="M14.315 12.849l-.63.777L9.5 10.239V4.69h1v5.07z" />
    </svg>
  );
};

export default ClockIcon;
