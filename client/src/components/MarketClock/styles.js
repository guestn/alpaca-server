/** @jsx jsx */
import spacing from '../../styles/spacing';

const styles = {
  marketClock: {
    ///padding: `0 0 ${spacing.unit * 8} 0`,
    display: 'flex',
    justifyContent: 'center',
    '> div': {
      alignItems: 'center',
      display: 'flex',
      marginRight: spacing.unit,
    },
  },
  statusText: {
    marginLeft: spacing.unit,
  },
};

export default styles;
