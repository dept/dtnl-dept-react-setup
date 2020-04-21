import React from 'react'

export interface NoSsrProps {}

export const NoSsr: React.FC<NoSsrProps> = ({ children }) => {
  const [isMounted, setMounted] = React.useState(false)
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!isMounted) return null

  return <>{children}</>
}
