import React from 'react';

import { Stack, Dropdown } from 'react-bootstrap';
import { VscChromeMinimize, VscChromeRestore, VscChromeClose } from 'react-icons/vsc';
import { BsFillLightbulbFill, BsFillLightbulbOffFill } from 'react-icons/bs';

import { useSelector } from 'react-redux';

const { ipcRenderer, shell } = window.require('electron');

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <button
        className="dropdown"
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
    >
        <span>{children}</span>
    </button>
));

const Menubar = () => {
    const locked = useSelector((state) => state.menu.locked);
    const loaded = useSelector((state) => state.project.loaded);

    // Theme manager
    const [theme, setTheme] = React.useState(localStorage.getItem('theme'));
    React.useEffect(() => {
        document.documentElement.setAttribute('data-bs-theme', localStorage.getItem('theme'));
    });
    function switchTheme(e) {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-bs-theme', newTheme);
        setTheme(newTheme);
    }

    return (
        <Stack className="menubar align-items-stretch" direction="horizontal">
            <Dropdown className="ms-3">
                <Dropdown.Toggle as={CustomToggle}>Project</Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item disabled={locked} onClick={() => ipcRenderer.send('menu:create')}>Create <span className="float-end opacity-50">Ctrl+N</span></Dropdown.Item>
                    <Dropdown.Item disabled={locked} onClick={() => ipcRenderer.send('menu:open')}>Load <span className="float-end opacity-50">Ctrl+O</span></Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item disabled={!loaded} onClick={() => ipcRenderer.send('menu:save')}>Save <span className="float-end opacity-50">Ctrl+S</span></Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <Dropdown>
                <Dropdown.Toggle as={CustomToggle}>Help</Dropdown.Toggle>

                <Dropdown.Menu>
                    {/* <Dropdown.Item href="#">Watch tutorial</Dropdown.Item> */}
                    <Dropdown.Item onClick={() => shell.openExternal('https://discord.gg/dKuftHFRJz')}>Discord support</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <button className="themeSwitcher ms-auto mx-3"
                onClick={switchTheme}
            >
                {theme === 'light'? <BsFillLightbulbOffFill/> : <BsFillLightbulbFill />}
            </button>

            <button className="appBtn" id="minimize" 
                onClick={() => ipcRenderer.send('app:minimize')}
            ><VscChromeMinimize /></button>

            <button className="appBtn" id="minimize-restore" 
                onClick={() => ipcRenderer.send('app:maximize-restore')
            }><VscChromeRestore /></button>

            <button className="appBtn" id="close" 
                onClick={() => ipcRenderer.send('app:close')
            }><VscChromeClose /></button>
        </Stack>
    );
}

export default React.memo(Menubar);