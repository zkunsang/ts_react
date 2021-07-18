import { Dispatch, FC, FunctionComponent, memo, useContext, useMemo } from 'react';
import * as React from 'react';
import Td from './Td';
import { TableContext } from './MineSearch';

interface Props {
    rowIndex: number;
}

const Tr: FC<Props> = ({ rowIndex }) => {
    const { tableData } = useContext(TableContext);

    return (
        <tr>
            {tableData[0] && Array(tableData[0].length).fill(null).map((td, i) => {
                <Td rowIndex={rowIndex} cellIndex={i} />
            })}
        </tr>
    )

};

export default memo(Tr);
