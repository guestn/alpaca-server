/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useEffect, Fragment } from 'react';
import { useInterval } from '../../utils';
import styles from './styles';
import { Position } from '../../redux/reducers/types';

interface PositionsBoxProps {
    positions: Position[];
    onRequestPositions: () => void;
    type: string;
}

const PositionsBox = ({ positions, onRequestPositions, type }: PositionsBoxProps) => {
    let title = 'Waiting';
    useEffect(() => {
        onRequestPositions();
    }, []);

    useInterval(() => {
        onRequestPositions();
    }, 10000);

    if (positions && positions.length) {
        title = `Positions (${positions.length})`;
    }

    const addSign = (num: number | string): string => {
        const res = num > 0 ? `+${num}` : `${num}`;
        return res;
    };

    const pctChange = (pos: Position) =>
        addSign(((100 * (parseFloat(pos.current_price) - parseFloat(pos.avg_entry_price))) / parseFloat(pos.avg_entry_price)).toFixed(2));
    const absChange = (pos: Position) => addSign((parseFloat(pos.current_price) - parseFloat(pos.avg_entry_price)).toFixed(2));
    const getPLSum = (posns: Position[]) =>
        addSign(posns.reduce((sum, curr) => sum + parseFloat(curr.unrealized_pl), 0).toFixed(2));

    return (
        <section css={styles.container(type)}>
            <div style={styles.header}>
                <h3 css={styles.h3}>{title}</h3>
            </div>
            {positions && !positions.length && <div css={styles.noOrders}>No current positions</div>}
            {positions && positions.length !== 0 && (
                <Fragment>
                    <table css={styles.table}>
                        <thead>
                            <tr>
                                <td>name</td>
                                <td>side</td>
                                <td>qty</td>
                                <td>avg. entry price</td>
                                <td>current price</td>
                                <td>trade value</td>
                                <td>market value</td>
                                <td>unrealized PL</td>
                            </tr>
                        </thead>
                        <tbody>
                            {positions.map((p) => (
                                <tr key={p.asset_id}>
                                    <td>{p.symbol}</td>
                                    <td>{p.side}</td>
                                    <td>{p.qty}</td>
                                    <td>{p.avg_entry_price}</td>
                                    <td>
                                        <div css={styles.spaced}>
                                            {p.current_price}
                                            {
                                                <span css={styles.coloredSpan(absChange(p) < 0)}>
                                                    {`(${absChange(p)})`}
                                                </span>
                                            }
                                            {
                                                <span css={styles.coloredSpan(absChange(p) < 0)}>
                                                    {`(${pctChange(p)}%)`}
                                                </span>
                                            }
                                        </div>
                                    </td>
                                    <td>{p.cost_basis}</td>
                                    <td>{p.market_value}</td>
                                    <td css={parseFloat(p.unrealized_pl) < 0 ? 'error' : 'ok'}>
                                        {addSign(parseFloat(p.unrealized_pl).toFixed(2))}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div css={styles.PLsum}>{getPLSum(positions)}</div>
                </Fragment>
            )}
        </section>
    );
};

export default PositionsBox;
