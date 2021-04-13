import { css } from 'styled-components';
import { percentage } from '../utils';
import { CSSDeclaration } from '../shared';

const width = new CSSDeclaration('width', (d) => `${percentage(1, d)}%`);

const FlexItem = css`
  flex: ${({ cols }) => (cols ? 'none' : '1')};
  ${({ theme: { breakpoints }, cols }) =>
    cols && width.declareResponsive(breakpoints, cols)}
`;

export default FlexItem;
