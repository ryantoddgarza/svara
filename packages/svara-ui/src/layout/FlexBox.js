import { css } from 'styled-components';
import { rem } from '../utils';

const FlexBox = css`
  display: flex;
  flex-wrap: wrap;
  margin-left: ${({ gap }) => gap && rem(gap * -0.5)};
  margin-right: ${({ gap }) => gap && rem(gap * -0.5)};
  margin-bottom: ${({ gap, gapBottom }) => gapBottom && rem(gap * -1)};

  & > * {
    width: 100%;
    max-width: 100%;
    padding-left: ${({ gap }) => gap && rem(gap * 0.5)};
    padding-right: ${({ gap }) => gap && rem(gap * 0.5)};
    margin-bottom: ${({ gap, gapBottom }) => gap && gapBottom && rem(gap)};
  }
`;

export default FlexBox;
