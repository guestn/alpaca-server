/** @jsx jsx */
import colors from '../../styles/colors';
import spacing from '../../styles/spacing';

const styles = {
  container: (noteType) => ({
    alignItems: 'center',
    backgroundColor: (noteType === 'OK') ? colors.ok : colors.error,
    borderRadius: `${spacing.br}px ${spacing.br}px 0 0`,
    bottom: 0,
    color: colors.white,
    cursor: 'pointer',
    display: 'flex',
    height: spacing.unit * 5,
    justifyContent: 'center',
    left: spacing.sideBarW,
    padding: spacing.unit,
    position: 'fixed',
    right: spacing.gridGap,
  }),
};

export default styles;
