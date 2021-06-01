/** @jsx jsx */
import { BoxSizingProperty, FlexDirectionProperty } from 'csstype';
import colors from '../../styles/colors';
import typography from '../../styles/typography';

export const app = {
    ...typography.base,
    background: `linear-gradient(45deg, ${colors.bg[0]},${colors.bg[1]})`,
    boxSizing: 'border-box' as BoxSizingProperty,
    color: colors.text,
    fontFamily: '"Be Vietnam", monospace',
    fontSize: 12,
    height: '100%',
    overflow: 'hidden',
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '80px 1fr',
    gridTemplateRows: '80px 1fr',
    gridAutoRows: '1fr',
};
export const login = {
    ...typography.base,
    background: `linear-gradient(45deg, ${colors.bg[0]},${colors.bg[1]})`,
    boxSizing: 'border-box' as BoxSizingProperty,
    color: colors.text,
    fontFamily: '"Be Vietnam", monospace',
    fontSize: 12,
    height: '100%',
    overflow: 'hidden',
    width: '100%',
    display: 'grid',
};



export const global = {
    a: {
        color: colors.text,
        textDecoration: 'none',
    },
    ...typography.base,
    '*': { boxSizing: 'border-box' as BoxSizingProperty },
    'html, body': {
        backgroundColor: colors.bg,
        height: '100%',
        margin: 0,
        padding: 0,
    },
    'ion-icon': {
        fontSize: 24,
        minWidth: 24,
    },
};
