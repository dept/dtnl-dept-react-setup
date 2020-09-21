import React from 'react';
interface CustomIconProps extends React.SVGProps<SVGSVGElement> {
  size: number;
}

const CheckIcon = ({ size, ...props }: CustomIconProps) => {
  if (size) {
    props.width = size;
    props.height = size;
  }

  return (
    <svg viewBox="0 0 18 14" {...props}>
      <path d="M16.087.35L5.625 11.2 1.913 7.35c-.45-.467-1.125-.467-1.576 0a1.157 1.157 0 000 1.633l4.5 4.667c.226.233.45.35.788.35s.563-.117.787-.35l11.25-11.667c.45-.466.45-1.166 0-1.633-.45-.467-1.124-.467-1.575 0z" />
    </svg>
  );
};

export default CheckIcon;
