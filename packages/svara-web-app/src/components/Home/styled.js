import styled from 'styled-components';
import { Container as UIContainer, rem } from '@svara/ui';

export const Home = styled.div``;

export const Container = styled(UIContainer)`
  max-width: ${rem(1024)};
`;

export const Section = styled.section`
  padding-top: ${({ theme: { space } }) => rem(space[5])};
  padding-bottom: ${({ theme: { space } }) => rem(space[5])};
  color: ${({ dark }) => (dark ? 'white' : '#1b1b1b')};
  background-color: ${({ dark }) => (dark ? '#1b1b1b' : 'white')};
`;
