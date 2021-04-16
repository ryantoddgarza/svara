import styled from 'styled-components';
import { rem } from '@svara/ui';

const LayoutMain = styled.main`
  padding-bottom: ${({ theme: { player } }) => rem(player.height.mobile)};

  @media (min-width: ${({ theme: { breakpoints } }) => breakpoints[1]}) {
    padding-bottom: ${({ theme: { player } }) => rem(player.height.desktop)};
  }
`;

export default LayoutMain;
