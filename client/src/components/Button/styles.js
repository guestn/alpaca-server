/** @jsx jsx */
import colors from '../../styles/colors';
import spacing from '../../styles/spacing';

const hover = (type) => ({
  backgroundColor: type === 'invisible' ? colors.mg : colors.hilite,
  cursor: 'pointer',
});


const getBackgroundColor = (active, type) => {
  if (type === 'invisible' || type === 'outline') {
    if (active) return colors.mg;
    return 'transparent';
  }
  return colors.hilite;
};

const styles = {
  button: (active, disabled, type) => ({
    alignItems: 'center',
    backgroundColor: getBackgroundColor(active, type),
    border: type === 'outline' ? `1px solid ${colors.text}` : 'none',
    borderRadius: 3,
    color: type === 'outline' || type === 'invisible' ? colors.text : colors.white,
    display: 'flex',
    fontSize: '0.8rem',
    justifyContent: 'center',
    opacity: disabled ? 0.5 : 1.0,
    padding: spacing.unit,
    height: spacing.unit * 4,
    width: '100%',
    '> i': {
      fontSize: 20,
    },
    ':hover': hover(type),
  }),
};

export default styles;
