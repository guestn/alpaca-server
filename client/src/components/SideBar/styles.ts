import { FlexDirectionProperty } from 'csstype';
import spacing from '../../styles/spacing';
import colors from '../../styles/colors';

export const sidebar = {
    borderRight: `1px solid ${colors.border}`,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column' as FlexDirectionProperty,
    padding: `${spacing.unit * 2} 0`,
    width: spacing.unit * 10,
    gridRow: '1 /span 2',
    a: {
        display: 'flex',
        width: 60,
        justifyContent: 'center',
        height: spacing.unit * 6,
        alignItems: 'center',
    },
};

export const logo = {
    width: 60,
    height: 60,
    marginBottom: spacing.unit * 6,
};
