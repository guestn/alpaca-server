/** @jsx jsx */

import colors from '../../styles/colors';
import spacing from '../../styles/spacing';
import typography from '../../styles/typography';

const styles = {
  ...typography,
  header: {
    alignItems: 'center',
    borderBottom: `1px solid ${colors.text}`,
    display: 'flex',
    padding: spacing.unit * 2,
    justifyContent: 'space-between',
  },
  loginStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    display: 'flex',
  },
  displayName: {
    marginLeft: spacing.unit,
    marginRight: spacing.unit,
    whiteSpace: 'nowrap',
  },
  link: {
    display: 'inline-flex',
    alignItems: 'center',
    color: colors.hilite,
    marginLeft: spacing.unit,
  },
};

export default styles;
