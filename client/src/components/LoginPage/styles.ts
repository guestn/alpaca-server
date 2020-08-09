/** @jsx jsx */
import { css } from '@emotion/core';
import spacing from '../../styles/spacing';
import colors from '../../styles/colors';
import typography from '../../styles/typography';

export const main = {
  ...typography,
  alignItems: 'center',
  borderRadius: spacing.br,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
};

export const logo = css({
  marginBottom: spacing.unit * 16,
  width: spacing.unit * 16,
});

export const loginContainer = css({
  border: `1px solid ${colors.text}`,
  padding: spacing.unit,
  width: spacing.unit * 40,
});
