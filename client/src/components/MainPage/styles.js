/** @jsx jsx */
import spacing from '../../styles/spacing';

const styles = {
  main: {
    padding: `0 0 ${spacing.unit * 8} 0`,
  },
  mainGrid: {
    display: 'grid',
    gridGap: spacing.unit * 2,
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    gridTemplateRows: '1fr 3fr 3fr 3fr',
    gridAutoRows: '1fr',
    height: 'calc(100vh - 80px)',
    padding: `${spacing.unit * 2}px ${spacing.unit * 2}px ${spacing.unit * 8}px ${spacing.unit * 2}px`,
  },
};

export default styles;
