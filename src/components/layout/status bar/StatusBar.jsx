import React from 'react';

import { Stack, ProgressBar } from 'react-bootstrap';

import { useSelector } from 'react-redux';

const StatusBar = () => {
    const now = useSelector((state) => state.statusBar.now);
    const text = useSelector((state) => state.statusBar.text);
    
    return (
        <Stack className="statusbar" direction="horizontal">
            <ProgressBar className="mx-3" animated now={now} max={100} />
            <span>{text}</span>
        </Stack>
    );
}

export default React.memo(StatusBar);