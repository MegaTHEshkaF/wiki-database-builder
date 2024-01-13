import React from 'react';

const ExplorerWindow = ({data}) => {
    return (
        <div className="asset-window">
            <pre>
                {JSON.stringify(data, null, 4)}
            </pre>
        </div>
    );
}

export default React.memo(ExplorerWindow);