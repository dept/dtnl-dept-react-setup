import { FC } from 'react'

export interface Props {}

export const NoSsr: FC<Props> = ({ children }) => {
  if (!process.browser) return null

  return <>{children}</>
}
