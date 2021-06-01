/** @jsx jsx */
import { WhiteSpaceProperty, FlexDirectionProperty } from 'csstype';
import colors from '../../styles/colors';
import spacing from '../../styles/spacing';
import typography from '../../styles/typography';

const styles = {
    ...typography,
    header: {
        alignItems: 'center',
        borderBottom: `1px solid ${colors.border}`,
        display: 'flex',
        padding: spacing.unit * 2,
        justifyContent: 'space-between',
    },
    loginStatus: {
        flexDirection: 'row' as FlexDirectionProperty,
        alignItems: 'center',
        display: 'flex',
    },
    displayName: {
        marginLeft: spacing.unit,
        marginRight: spacing.unit,
        whiteSpace: 'nowrap' as WhiteSpaceProperty,
    },
    link: {
        display: 'inline-flex',
        alignItems: 'center',
        color: colors.hilite,
        marginLeft: spacing.unit,
    },
};

export default styles;
