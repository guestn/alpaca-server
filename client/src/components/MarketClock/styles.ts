/** @jsx jsx */
import spacing from '../../styles/spacing';

export const marketClock = {
  ///padding: `0 0 ${spacing.unit * 8} 0`,
  display: 'flex',
  justifyContent: 'center',
  '> div': {
    alignItems: 'center',
    display: 'flex',
    marginRight: spacing.unit,
  },
};
export const statusText = {
  marginLeft: spacing.unit,
};
