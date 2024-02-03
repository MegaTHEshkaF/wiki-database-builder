import React from 'react';

import Menubar from './components/layout/menubar/Menubar';
import StatusBar from './components/layout/status bar/StatusBar';

import CreateProjectModal from './components/modals/CreateProjectModal';
import OpenProjectModal from './components/modals/OpenProjectModal';

import ExplorerProvider from './context/ExplorerProvider';
import Tabber from './components/layout/tabber/Tabber';

function App() {
    return (
        <>
            <ExplorerProvider>
                <Menubar />
                <Tabber />
                <StatusBar />
                <CreateProjectModal />
                <OpenProjectModal />
            </ExplorerProvider>
        </>
    );
}

export default App;