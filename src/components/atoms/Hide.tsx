import styled from 'styled-components'
import { DisplayProps, display } from 'styled-system'

type HideProps = DisplayProps

export const Hide = styled.div<HideProps>`
  ${display}
`
