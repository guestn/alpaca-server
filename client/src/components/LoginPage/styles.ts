/** @jsx jsx */
import { BorderRadiusProperty, FlexDirectionProperty } from 'csstype';
import { css } from '@emotion/core';
import spacing from '../../styles/spacing';
import colors from '../../styles/colors';
import typography from '../../styles/typography';

export const main = {
  ...typography,
  alignItems: 'center',
  borderRadius: spacing.br as BorderRadiusProperty,
  display: 'flex',
  flexDirection: 'column' as FlexDirectionProperty,
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
