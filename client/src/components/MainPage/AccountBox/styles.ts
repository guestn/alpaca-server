/** @jsx jsx */
import { css, SerializedStyles } from '@emotion/core';
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
    gridRow: '4 / span 4',
  },
  header: {
    alignItems: 'center',
    borderBottom: `1px solid ${colors.text}`,
    display: 'flex',
    height: spacing.unit * 6,
    justifyContent: 'center',
    width: '100%',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    padding: spacing.unit,
    alignItems: 'center',
    justifyContent: 'center',
  },
  balance: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flex: 1,
    fontSize: '1.2rem',
  },
  smallHeader: {
    fontSize: '0.8rem',
    lineHeight: 1,
  }
};

export default styles;
