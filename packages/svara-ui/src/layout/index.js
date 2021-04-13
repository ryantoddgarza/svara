import styled from 'styled-components';
import FlexBox from './FlexBox';
import FlexItem from './FlexItem';

export const Flex = styled.div`
  ${({ box }) => (box ? FlexBox : null)}
  ${({ item }) => (item ? FlexItem : null)}
`;

export const Grid = styled.div``;
