import React from 'react';

import Menubar from './components/layout/menubar/Menubar';
import Navbar from './components/layout/navbar/Navbar';
import StatusBar from './components/layout/status bar/StatusBar';

import { Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import Structure from './components/pages/Structure';
import Translation from './components/pages/Translation';
import Export from './components/pages/Export';
import Settings from './components/pages/Settings';

import CreateProjectModal from './components/modals/CreateProjectModal';
import OpenProjectModal from './components/modals/OpenProjectModal';

import AssetsTableDataProvider from './context/AssetsTableDataProvider';

function App() {
    
    return (
        <>
            <AssetsTableDataProvider>
                <Menubar />
                <div className='wrapper'>
                    <Navbar />
                    <main className='workspace'>
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='/structure' element={<Structure />} />
                            <Route path='/translation' element={<Translation />} />
                            <Route path='/export' element={<Export />} />
                            <Route path='/settings' element={<Settings />} />
                        </Routes>
                    </main>
                </div>
                <StatusBar />

                <CreateProjectModal />
                <OpenProjectModal />
            </AssetsTableDataProvider>
        </>
    );
}

export default App;