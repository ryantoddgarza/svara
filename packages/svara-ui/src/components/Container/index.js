import styled from 'styled-components';
import { rem } from '../../utils';

const Container = styled.div`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: ${({ theme }) => rem(theme.space[3])};
  padding-right: ${({ theme }) => rem(theme.space[3])};
`;

export default Container;
