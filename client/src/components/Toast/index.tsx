/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useEffect, useRef, useState } from 'react';
import { NoteType } from '../../redux/actions/createNotification';
import { Notification } from '../../redux/reducers/types';
import { container } from './styles';

const Toast = ({ message = 'There was an error', noteType, createdAt }: Notification) => {
    const timerRef = useRef<number | null>(null);
    const [isActive, setIsActive] = useState(false);
    const setTimer = () => {
        timerRef.current = window.setTimeout(() => {
            setIsActive(false);
        }, 3000);
    };

    useEffect(() => {
        setIsActive(true);
        setTimer();
        return () => {
            window.clearTimeout(timerRef.current!);
        };
    }, [message]);

    if (isActive) {
        return (
            <section css={container(noteType)} onClick={() => setIsActive(false)}>
                {message}
            </section>
        );
    }
    return null;
};

export default Toast;
