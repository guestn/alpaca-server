/** @jsx jsx */

import colors from '../../styles/colors';
import spacing from '../../styles/spacing';

const styles = {
  container: {
    border: `1px solid ${colors.text}`,
    gridColumn: '2 / span 4',
    gridRow: '1 / span 7',
  },
  header: {
    alignItems: 'center',
    borderBottom: `1px solid ${colors.text}`,
    display: 'flex',
    height: spacing.unit * 6,
    justifyContent: 'space-between',
    width: '100%',
    padding: `0 ${spacing.unit}`,
  },
  buttonContainer: {
    display: 'flex',
  },
  graphContainer: {
    height: `calc(100% - ${spacing.unit * 6}px)`,
  },
  svg: {
    //backgroundColor: 'rgba(0,0,0,0.1)',
    background: `linear-gradient(45deg, ${colors.mg}, ${colors.white})`,
    color: colors.text,
    overflow: 'visible',
  },
};

export default styles;
