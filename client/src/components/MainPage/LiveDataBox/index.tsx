/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { object, string } from 'prop-types';
import Icon from '../../Icon';

import styles from './styles';
import { LiveData, LiveDatum } from '../../../redux/reducers/types';

interface LiveDataBoxProps {
    liveData: LiveDatum | null;
    ticker: string;
}

const LiveDataBox = ({ liveData = { p: 0, t: 0 }, ticker }: LiveDataBoxProps) => {
    const [p, setP] = useState(0);
    const [change, setChange] = useState('up');

    let title = 'Waiting';
    let price = 0;
    if (liveData && Object.keys(liveData).length) {
        price = liveData.p;
        title = ticker;
    }

    useEffect(() => {
        if (liveData) {
            const delta = liveData.p - p;
            if (!isNaN(delta)) {
                let movement = 'no';
                if (delta > 0) movement = 'up';
                if (delta < 0) movement = 'down';
                if (movement !== 'no') setChange(movement);
            }
            setP(liveData.p);
        }
    }, [liveData]);

    return (
        <section css={styles.container}>
            <div css={styles.header}>
                <h3 css={styles.h3}>{title}</h3>
            </div>
            <div css={styles.balance}>
                {price}
                <Icon name={`caret-${change}-outline`} />
            </div>

            { liveData && <p>{ format(new Date(liveData.t * 0.001), 'HH:mm:ss') }</p> }
        </section>
    );
};

LiveDataBox.propTypes = {
    liveData: object,
    ticker: string,
};

export default LiveDataBox;
