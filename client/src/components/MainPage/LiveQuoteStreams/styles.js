/** @jsx jsx */

import colors from '../../../styles/colors';
import spacing from '../../../styles/spacing';
import typography from '../../../styles/typography';
import tables from '../../../styles/tables';


const styles = {
  ...typography,
  container: {
    border: `1px solid ${colors.text}`,
    display: 'flex',
    flexDirection: 'column',
    gridColumn: '2 / span ',
    gridRow: '8 / span 3',
    overflow: 'scroll'.toString,
  },
  balance: {
    alignItems: 'center',
    display: 'flex',
    flex: 1,
    fontSize: '1.4rem',
    justifyContent: 'center',
  },
  table: {
    ...tables,
    width: 300,
    maxWidth: 300,
    fontSize: '0.8rem',
    '> thead tr': {
      borderBottom: `1px solid ${colors.text}`,
    },
    td: {
      width: 50,
      maxWidth: 50,
      minWidth: 50,
      padding: `${spacing.unit * 0.5} ${spacing.unit}`,
    },
  },
};

export default styles;
