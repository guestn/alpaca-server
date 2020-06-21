/** @jsx jsx */

import typography from '../../styles/typography';
import colors from '../../styles/colors';
import buttonStyles from '../../components/Button/styles';

const styles = {
  base: (active: boolean, disabled: boolean, isButton: boolean, styleOverrides: {}, type: string) => {
    if (isButton) {
      return buttonStyles.button(active, disabled, type);
    }
    return {
      ...typography.base,
      a: {
        ...typography.base,
      },
      border: active ? `1px solid ${colors.mg}`: 'none',
      ...styleOverrides,
    };
  },
};

export default styles;
