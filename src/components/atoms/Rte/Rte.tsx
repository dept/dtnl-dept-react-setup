import styled from '@emotion/styled';
import { FC } from 'react';

interface RteProps {
  children: string;
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
`;
export const Rte: FC<RteProps> = ({ children }) => (
  <StyledRte dangerouslySetInnerHTML={{ __html: children }} />
);
