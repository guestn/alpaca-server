/** @jsx jsx */

import colors from './colors';
import spacing from './spacing';

const tables = {
  borderCollapse: 'collapse',
  borderBottom: `1px solid ${colors.text}`,
  td: {
    color: colors.text,
    fontSize: '0.85rem',
    lineHeight: 1.5,
    padding: spacing.unit * 1,
    '&.error': {
      background: colors.error,
      color: colors.white,
    },
    '&.ok': {
      background: colors.ok,
      color: colors.white,
    },
    '&.hoverable:hover': {
      background: colors.fg,
      cursor: 'pointer',
    },
  },
  'thead > tr': {
    background: colors.mg,
  },
};

export default tables;
