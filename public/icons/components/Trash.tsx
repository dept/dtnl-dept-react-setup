import React from 'react';
interface CustomIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

const TrashIcon = ({ size, ...props }: CustomIconProps) => {
  if (size) {
    props.width = size;
    props.height = size;
  }

  return (
    <svg width={15} height={18} viewBox="0 0 15 18" {...props}>
      <g fill="none" fillRule="evenodd" stroke="currentColor">
        <path d="M.567 4.5l1.639 13h10.588l1.639-13H.567z" />
        <path fill="currentColor" d="M.5 2.5h14v1H.5zm4-2h6v1h-6z" />
        <path fill="currentColor" d="M4.5.5h1v1h-1zm6 0h1v1h-1z" />
      </g>
    </svg>
  );
};

export default TrashIcon;
