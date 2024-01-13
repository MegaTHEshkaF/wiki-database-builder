import React from 'react';
import { ExplorerContext } from '.';

const ExplorerProvider = ({children}) => {
    const [tableData, setTableData] = React.useState([]);
    const [windowData, setWindowData] = React.useState('');

    const explorerContext = React.useMemo(() => ({
        tableData,
        setTableData,
        windowData, 
        setWindowData,
    }), [tableData, setTableData, windowData, setWindowData]);

    return (
        <ExplorerContext.Provider value={explorerContext}>
            {children}
        </ExplorerContext.Provider>
    );
}

export default ExplorerProvider;