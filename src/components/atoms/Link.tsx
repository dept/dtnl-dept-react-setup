import { default as NextLink, LinkProps } from 'next/link'

export const Link: React.FC<LinkProps> = props => <NextLink passHref {...props} />
