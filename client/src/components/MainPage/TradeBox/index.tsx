/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, { useState } from 'react';
import Button from '../../Button';
import Icon from '../../Icon';

import styles from './styles';

enum Side {
  BUY = 'buy',
  SELL = 'sell'
}

interface OnCreatOrderArgs {
    symbol: string;
    qty: number;
    side: Side;
    type: string,
    time_in_force: string;
}
interface TradeBoxProps {
    ticker: string;
    onCreateOrder: (args: OnCreatOrderArgs) => void;
}

const TradeBox = ({ onCreateOrder, ticker }: TradeBoxProps) => {
    const [qty, setQty] = useState(0);
    const [isLocked, setIsLocked] = useState(true);

    const onClickButton = (side: Side) => {
        if (qty <= 0) return;
        onCreateOrder({
            symbol: ticker,
            qty,
            side,
            type: 'market',
            time_in_force: 'gtc',
        });
        setIsLocked(true);
    };

    return (
        <section css={styles.container}>
            <header css={styles.header}>
                <h3 css={styles.h3}>Trade {ticker}</h3>
                <Icon
                    name={isLocked ? 'lock-open-outline' : 'lock-closed-outline'}
                    onClick={() => setIsLocked((val) => !val)}
                />
            </header>
            <fieldset css={styles.form}>
                <label htmlFor="qty">Qty</label>
                <input
                    css={styles.input}
                    type="number"
                    id="qty"
                    value={qty}
                    onChange={(e) => setQty(parseInt(e.target.value))}
                />
                <div css={styles.buttonContainer}>
                    <Button disabled={qty <= 0 || isLocked} label="Sell" onClick={() => onClickButton(Side.SELL)} />
                    <Button disabled={qty <= 0 || isLocked} label="Buy" onClick={() => onClickButton(Side.BUY)} />
                </div>
            </fieldset>
        </section>
    );
};

export default TradeBox;
