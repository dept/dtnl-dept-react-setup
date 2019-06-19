import styled from 'styled-components'
import { display, DisplayProps, height,HeightProps } from 'styled-system'

import { grid } from '@/theme/grid'
import { media } from '@/utils/media'

type ContainProps = DisplayProps & HeightProps

export const Contain = styled.div<ContainProps>`
  max-width: ${grid.container.maxWidth}px;
  margin: 0 auto;
  padding: 0 ${grid.container.padding}px;
  ${display}
  ${height}

  ${media.max('tablet')} {
    padding: 0 ${grid.container.paddingSmall}px;
  }
`
