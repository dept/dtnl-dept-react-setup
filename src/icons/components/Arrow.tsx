interface CustomIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

const ArrowIcon = ({ size, ...props }: CustomIconProps) => {
  if (size) {
    props.width = size;
    props.height = size;
  }

  return (
    <svg viewBox="0 0 31 22" {...props}>
      <path
        fill="currentColor"
        d="M2.703 11.58l8.832 9.058-.716.698-10-10.256 10-10.257.716.699-8.832 9.058h27.78v1H2.703z"
      />
    </svg>
  );
};

export default ArrowIcon;
