/** @jsx jsx */

import spacing from '../../styles/spacing';
import colors from '../../styles/colors';

import typography from '../../styles/typography';

const styles = {
  main: {
    ...typography,
    alignItems: 'center',
    borderRadius: spacing.borderRadius,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  logo: {
    marginBottom: spacing.unit * 16,
    width: spacing.unit * 16,
  },
  loginContainer: {
    border: `1px solid ${colors.text}`,
    padding: spacing.unit,
    width: spacing.unit * 40,
  },
};

export default styles;
