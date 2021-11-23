import styled from '@emotion/styled';

export const Divider = styled.hr`
  border: 0;
  border-top: 1px solid ${(props: any) => props.theme.colors.gray[100]};
  display: block;
  height: 1px;
  width: 100%;
  margin: 0px;
`;
