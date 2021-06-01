import { Notification } from "../../reducers/types";

export const CREATE_NOTIFICATION = 'CREATE_NOTIFICATION';

export enum NoteType {
    OK = 'OK',
    ERROR = 'ERROR',
}

interface Params {
    message: string;
    noteType: NoteType;
}

interface CreateNotificationAction {
    type: typeof CREATE_NOTIFICATION;
    message: string;
    noteType: NoteType;
    createdAt: Date;
}

export const createNotification = ({ message, noteType }: Notification) => ({
    type: CREATE_NOTIFICATION,
    notification: {
        message,
        noteType,
        createdAt: new Date(),
    },
});
