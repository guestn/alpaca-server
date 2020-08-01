/** @jsx jsx */
import spacing from '../../styles/spacing';
import { css } from '@emotion/core';

export const main = css({
  padding: `0 0 ${spacing.unit * 8} 0`,
});
export const mainGrid = css({
  display: 'flex',
  flexDirection: 'column',
  height: 'calc(100vh - 80px)',
  padding: `${spacing.unit * 2}px ${spacing.unit * 2}px ${spacing.unit * 8}px ${spacing.unit * 2}px`,
});
