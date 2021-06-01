/** @jsx jsx */ 
import { FlexDirectionProperty, OverflowYProperty, PaddingProperty } from 'csstype';
import colors from '../../styles/colors';
import spacing from '../../styles/spacing';
import typography from '../../styles/typography';
import tables from '../../styles/tables';

const styles = {
    ...typography,
    container: (type: string) => ({
        border: `1px solid ${colors.border}`,
        display: 'flex',
        flexDirection: 'column' as FlexDirectionProperty,
        gridColumn: type === 'compact' ? '2 / span 4' : '1 / span 1',
        gridRow: type === 'compact' ? '8 / span 3' : '1 / span 1',
        overflowY: 'scroll' as OverflowYProperty,
    }),
    header: {
        borderBottom: `1px solid ${colors.border}`,
        display: 'flex',
        height: spacing.unit * 6,
        minHeight: spacing.unit * 6,
        justifyContent: 'center',
        width: '100%',
        alignItems: 'center',
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
    disabled: (val: boolean) => ({
        td: {
            color: val ? colors.mg : colors.text,
        },
    }),
};

export default styles;
