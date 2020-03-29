import { useContext } from 'react'
import { ThemeContext } from 'styled-components'
import { DisplayProps, HeightProps } from 'styled-system'

import { Box } from './Box'

type GridProps = DisplayProps & HeightProps

export const Grid: React.FC<GridProps> = props => {
  const themeContext = useContext(ThemeContext)

  return (
    <Box
      mx="auto"
      px={
        themeContext &&
        themeContext.grid &&
        themeContext.grid.container &&
        themeContext.grid.container.padding
      }
      maxWidth={
        themeContext &&
        themeContext.grid &&
        themeContext.grid.container &&
        themeContext.grid.container.maxWidth
      }
      {...props}
    />
  )
}
