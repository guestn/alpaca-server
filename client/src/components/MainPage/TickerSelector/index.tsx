/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, { useEffect } from 'react';
import Select from 'react-select';
import { func, array, string } from 'prop-types';

import styles from './styles';
import { Asset } from '../../../redux/reducers/types';

interface TickerSelectorProps {
    assets: Asset[];
    onRequestAssets: () => void;
    onRequestTicker: (ticker: string) => void;
    ticker: string;
}

const TickerSelector = ({ assets, onRequestAssets, onRequestTicker, ticker }: TickerSelectorProps) => {
    useEffect(() => {
        onRequestAssets();
    }, [ticker]);

    return (
        <form css={styles.container}>
            <Select
                styles={styles.select}
                value={{ label: ticker, value: 0 }}
                options={assets && assets.map((a, idx) => ({ label: a.symbol, value: idx }))}
                onChange={(option: { label: string }) => onRequestTicker(option.label)}
            />
        </form>
    );
};

TickerSelector.propTypes = {
    assets: array,
    onRequestAssets: func,
    onRequestTicker: func,
    ticker: string,
};

export default TickerSelector;
