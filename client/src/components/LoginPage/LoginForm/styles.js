/** @jsx jsx */

import colors from '../../../styles/colors';
import spacing from '../../../styles/spacing';

const styles = {
  form: {
    alignItems: 'center',
    border: 'none',
    display: 'flex',
    flexDirection: 'column',
    fontSize: '1.0rem',
    justifyContent: 'center',
    padding: 0,
  },
  input: {
    fontSize: '1.0rem',
    marginBottom: spacing.unit,
    marginTop: spacing.unit,
    padding: spacing.unit,
    width: '100%',
  },
  warningText: {
    color: colors.error,
    marginBottom: spacing.unit,
  },
};

export default styles;
