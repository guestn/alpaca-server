/** @jsx jsx */
import { css } from '@emotion/core';
import colors from '../../../styles/colors';
import spacing from '../../../styles/spacing';

export const form = css({
  alignItems: 'center',
  border: 'none',
  display: 'flex',
  flexDirection: 'column',
  fontSize: '1.0rem',
  justifyContent: 'center',
  padding: 0,
});

export const input = css({
  fontSize: '1.0rem',
  marginBottom: spacing.unit,
  marginTop: spacing.unit,
  padding: spacing.unit,
  width: '100%',
});

export const warningText = css({
  color: colors.error,
  marginBottom: spacing.unit,
});
