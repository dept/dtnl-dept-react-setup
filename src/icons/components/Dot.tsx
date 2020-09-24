import React from 'react';
interface CustomIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

const DotIcon = ({ size, ...props }: CustomIconProps) => {
  if (size) {
    props.width = size;
    props.height = size;
  }

  return (
    <svg width={16} height={16} viewBox="0 0 16 16" {...props}>
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

export default DotIcon;
