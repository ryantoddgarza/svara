import styled from 'styled-components';
import { NavLink as ReactNavLink } from 'react-router-dom';
import { rem } from '@svara/ui';

export const Nav = styled.nav`
  display: flex;
  flex-direction: row;
`;

export const NavLink = styled(ReactNavLink)`
  &.active {
    color: #757575;
  }

  &:not(:last-of-type) {
    margin-right: ${({ theme }) => rem(theme.space[3])};
  }
`;
