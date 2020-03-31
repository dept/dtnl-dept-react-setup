import React from 'react'

const Dot = (props: React.SVGProps<SVGSVGElement>) => (
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
)

export default Dot
