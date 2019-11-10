import React, { FC } from 'react'
import styled from 'styled-components'

interface RteProps {
  children: string
}

const StyledRte = styled.div`
  h1 {
  }

  h2 {
  }

  h3 {
  }

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
