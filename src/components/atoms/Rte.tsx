import React, { FC } from 'react'
import styled from 'styled-components'

interface RteProps {
  children: string
}

const StyledRte = styled.div`
  p {
  }

  a {
  }

  ul {
  }

  li {
  }
`
export const Rte: FC<RteProps> = ({ children }) => (
  <StyledRte dangerouslySetInnerHTML={{ __html: children }} />
)
