import styled from 'styled-components'
import { display,DisplayProps } from 'styled-system'

type HideProps = DisplayProps

export const Hide = styled.div<HideProps>`
  ${display}
`
