import React from 'react';

import { Stack, ProgressBar, Container } from 'react-bootstrap';

const StatusBar = () => {
    return (
        <Stack className="statusbar" direction="horizontal">
            <ProgressBar className="mx-3" animated now={45} />
            <span>Text</span>
        </Stack>
    );
}

export default React.memo(StatusBar);