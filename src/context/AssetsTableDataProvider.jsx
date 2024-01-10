import React from 'react';
import { AssetsTableContext } from '.';

const AssetsTableDataProvider = ({children}) => {
    const [data, setData] = React.useState([]);

    return (
        <AssetsTableContext.Provider value={{data, setData}}>
            {children}
        </AssetsTableContext.Provider>
    );
}

export default AssetsTableDataProvider;