import React from 'react';

import { Button, Stack } from 'react-bootstrap';

import { useSelector } from 'react-redux';

const { ipcRenderer } = window.require('electron');

const Home = () => {
    const locked = useSelector((state) => state.menu.locked);

    return (
        <section id="home">
            <div className="d-flex h-100 justify-content-center">
                <Stack direction="horizontal" gap={3}>
                    <Button size="lg" disabled={locked} onClick={() => ipcRenderer.send('menu:create')}>Create new project</Button>
                    <Button size="lg" disabled={locked} variant="secondary" onClick={() => ipcRenderer.send('menu:open')}>Open project</Button>
                </Stack>
            </div>
        </section>
    );
}

export default React.memo(Home);