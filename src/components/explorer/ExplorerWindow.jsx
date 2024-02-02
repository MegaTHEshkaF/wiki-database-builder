import React from 'react';

const ExplorerWindow = ({data}) => {
    console.log(Object.keys(data).length);
    return (
        <div className="asset-window">
            {Object.keys(data).length > 0 ? 
                <pre>
                    <code>
                        {Object.keys(data.MonoBehaviour).map(property => (
                            <span>{property}</span>
                        ))}
                    </code> 
                </pre>
            : <div className='h-100 d-flex fs-2 justify-content-center align-items-center text-muted'>Select asset to open it</div> }
        </div>
    );
}

export default React.memo(ExplorerWindow);