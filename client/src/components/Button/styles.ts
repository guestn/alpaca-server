/** @jsx jsx */
import colors from '../../styles/colors';
import spacing from '../../styles/spacing';
import { css } from '@emotion/core';

const hover = (displayType: string) => ({
    backgroundColor: displayType === 'invisible' ? colors.mg : colors.hilite,
    cursor: 'pointer',
});

const getBackgroundColor = (active: boolean, displayType: string) => {
    if (displayType === 'invisible' || displayType === 'outline') {
      
        if (active) return colors.mg;
        return 'transparent';
    }
    return colors.hilite;
};

export const buttonStyle = (active: boolean, disabled: boolean, displayType: string) =>
    css({
        alignItems: 'center',
        backgroundColor: getBackgroundColor(active, displayType),
        border: displayType === 'outline' ? `1px solid ${colors.text}` : 'none',
        borderRadius: 3,
        color: displayType === 'outline' || displayType === 'invisible' ? colors.text : colors.white,
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
        ':hover': hover(displayType),
    });
