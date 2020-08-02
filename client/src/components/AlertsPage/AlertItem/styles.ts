/** @jsx jsx */
import { css } from '@emotion/core';
import spacing from '../../../styles/spacing';
import colors from '../../../styles/colors';

export const container = css({
  padding: `${spacing.unit * 1}`,
  border: `1px solid ${colors.text}`,
  display: 'flex',
  height: spacing.unit * 16,
  justifyContent: 'space-between',
  marginBottom: spacing.unit * 2,
});

export const buttonContainer = css({
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
});
