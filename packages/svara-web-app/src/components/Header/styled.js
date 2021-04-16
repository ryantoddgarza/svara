import styled from 'styled-components';
import { Container, rem } from '@svara/ui';

export const Header = styled.header`
  background-color: white;
  border-bottom: 1px solid #c9c9c9;
`;

export const HeaderContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: ${({ theme: { header } }) => rem(header.height.mobile)};
`;

export const HeaderTitle = styled.div`
  letter-spacing: 0.1em;
  font-weight: 500;

  & > a {
    font: inherit;
  }
`;
