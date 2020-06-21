/** @jsx jsx */

import colors from '../../../styles/colors';
import spacing from '../../../styles/spacing';
import typography from '../../../styles/typography';

const styles = {
  ...typography,
  container: {
    alignItems: 'center',
    border: `1px solid ${colors.text}`,
    display: 'flex',
    flexDirection: 'column',
    gridColumn: '1 / span 1',
    gridRow: '3  / span 1',
  },
  header: {
    alignItems: 'center',
    borderBottom: `1px solid ${colors.text}`,
    display: 'flex',
    height: spacing.unit * 6,
    justifyContent: 'center',
    width: '100%',
  },
  input: {
    fontSize: '1.0rem',
    marginBottom: spacing.unit,
    marginTop: spacing.unit,
    padding: spacing.unit,
    height: spacing.unit * 4,
    width: '100%',
  },
  form: {
    border: 'none',
    display: 'flex',
    flexDirection: 'column',
    padding: spacing.unit,
    width: '100%',
  },
  buttonContainer: {
    display: 'flex',
    button: {
      display: 'block',
      width: `calc(50% - ${spacing.unit * 0.5}px)`,
      '&:first-of-type': {
        marginRight: spacing.unit,
      },
    },
  }
};

export default styles;
