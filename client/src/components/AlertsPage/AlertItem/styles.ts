/** @jsx jsx */
import { css } from '@emotion/core';
import spacing from '../../../styles/spacing';
import colors from '../../../styles/colors';

export const container = css({
  padding: `0 0 ${spacing.unit * 8} 0`,
  border: `1px solid ${colors.text}`,
  display: 'flex',
  height: 100,
});
