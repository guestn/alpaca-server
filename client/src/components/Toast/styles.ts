import { LeftProperty, RightProperty, PositionProperty } from 'csstype';
import colors from '../../styles/colors';
import spacing from '../../styles/spacing';
import { NoteType } from '../../redux/actions/createNotification';

export const container = (noteType: NoteType | undefined) => ({
    alignItems: 'center',
    backgroundColor: noteType === 'OK' ? colors.ok : colors.error,
    borderRadius: `${spacing.br}px ${spacing.br}px 0 0`,
    bottom: 0,
    color: colors.white,
    cursor: 'pointer',
    display: 'flex',
    height: spacing.unit * 5,
    justifyContent: 'center',
    left: spacing.sideBarW  as LeftProperty<number>,
    padding: spacing.unit,
    position: 'fixed' as PositionProperty,
    right: spacing.gridGap as RightProperty<number>,
});
