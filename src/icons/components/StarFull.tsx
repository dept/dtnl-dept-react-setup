import { FC } from 'react';
interface CustomIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

const StarFullIcon = ({ size, ...props }: CustomIconProps) => {
  if (size) {
    props.width = size;
    props.height = size;
  }

  return (
    <svg viewBox="0 0 18 18" {...props}>
      <path
        fill="currentColor"
        d="M9 0l2.75 6 6.25.5-4.833 4.5 1.416 6.083-5.75-3.167-5.416 3.167 1.333-6.417L0 6.5l6.5-.75z"
      />
    </svg>
  );
};

export default StarFullIcon;
