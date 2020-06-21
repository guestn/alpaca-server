/** @jsx jsx */

import colors from './colors';
import spacing from './spacing';

const typography = {
  base: {
    color: colors.text,
    display: 'flex',
    fontSize: 12,
    fontWeight: 400,
    letterSpacing: '0.01em',
    lineHeight: 1.5,
  },
  code: {
    fontFamily: 'source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace',
  },
  h1: {
    margin: 0,
    fontSize: '1.6rem',
    lineHeight: 1,
  },
  h2: {
    margin: `0 0 ${spacing.unit} 0`,
    textTransform: 'capitalize',
    fontSize: '1.2rem',
  },
  h3: {
    margin: 0,
    fontSize: '1.0rem',
    lineHeight: 1,
  },
};

export default typography;
