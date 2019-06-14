import { FC } from 'react'
import styled from 'styled-components'

import { Box } from './Box'

const StyledUl = styled.ul`
  list-style: none;
  margin: 0px;
  padding: 0px;
`

interface Props {
  items: any[]
}

export const List: FC<Props> = ({ items }) => (
  <StyledUl>
    {items.map((item, index) => (
      <li key={index}>
        <Box as="div" mb="xxs" key={index}>
          {item}
        </Box>
      </li>
    ))}
  </StyledUl>
)
