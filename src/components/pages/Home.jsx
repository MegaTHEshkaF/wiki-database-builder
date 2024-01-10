import React from 'react';

import { Button, Stack } from 'react-bootstrap';

import { useSelector } from 'react-redux';

const { ipcRenderer, shell } = window.require('electron');

const Home = () => {
    const locked = useSelector((state) => state.menu.locked);

    // Добавить инструкцию

    return (
        <section id="home">
            <div className="d-flex h-100 flex-column justify-content-center align-items-center">
                <ol>
                    <strong>To create a new project:</strong>
                    <li>Download <a onClick={() => shell.openExternal('https://github.com/AssetRipper/AssetRipper')} href="#">AssetRipper</a> and open it.</li>
                    <li>Set <i>Bundled Assets Export Mode</i> to <i>Group By Asset Type</i>.</li>
                    <li>Open the game folder using AssetRipper.</li>
                    <li>Click <i>Export → Export all Files</i>.</li>
                    <li>Now click <i>Create new project</i> button below.</li>
                </ol>
                <Stack direction="horizontal" gap={3} className="justify-content-center">
                    <Button size="lg" disabled={locked} onClick={() => ipcRenderer.send('menu:create')}>Create new project</Button>
                    <Button size="lg" disabled={locked} variant="secondary" onClick={() => ipcRenderer.send('menu:open')}>Open project</Button>
                </Stack>
            </div>
        </section>
    );
}

export default React.memo(Home);