/** @jsx jsx */
import { FlexDirectionProperty, OverflowYProperty, PositionProperty } from 'csstype';
import colors from '../../styles/colors';
import spacing from '../../styles/spacing';
import typography from '../../styles/typography';
import tables from '../../styles/tables';

const styles = {
    ...typography,
    container: (type: string) => ({
        border: `1px solid ${colors.text}`,
        display: 'flex',
        flexDirection: 'column' as FlexDirectionProperty,
        gridColumn: type === 'compact' ? '3 / span 3' : '1 / span 1',
        gridRow: type === 'compact' ? '8 / span 3' : '2 / span 1',
        overflowY: 'scroll' as OverflowYProperty,
        position: 'relative' as PositionProperty,
    }),
    header: {
        borderBottom: `1px solid ${colors.text}`,
        display: 'flex',
        height: spacing.unit * 6,
        minHeight: spacing.unit * 6,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    noOrders: {
        display: 'flex',
        alignSelf: 'center',
        padding: spacing.unit,
    },
    table: {
        ...tables,
        fontSize: '1em',
    },
    coloredSpan: (val: string) => ({
        color: val ? colors.error : colors.ok,
    }),
    PLsum: {
        position: 'absolute'  as PositionProperty,
        right: 0,
        bottom: 0,
        borderTop: `1px solid ${colors.text}`,
        background: colors.mg,
        padding: spacing.unit,
        fontSize: '1.25rem',
    },
    spaced: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingRight: spacing.unit * 6,
    },
};

export default styles;
