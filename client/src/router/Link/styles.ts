/** @jsx jsx */

import typography from '../../styles/typography';
import colors from '../../styles/colors';
import { buttonStyle } from '../../components/Button/styles';
import { css } from '@emotion/core';

export const base = (active: boolean, disabled: boolean, isButton: boolean, styleOverrides: {}, type: string) => {
  if (isButton) {
    return buttonStyle(active, disabled, type);
  }
  return {
    ...typography.base,
    a: {
      ...typography.base,
    },
    border: active ? `1px solid ${colors.mg}` : 'none',
    ...styleOverrides,
  };
};
