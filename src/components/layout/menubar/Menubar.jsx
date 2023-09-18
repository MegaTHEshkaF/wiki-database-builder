import React, { useState } from 'react';

import { Stack, Dropdown } from 'react-bootstrap';
import { VscChromeMinimize, VscChromeRestore, VscChromeClose } from 'react-icons/vsc';
import { BsFillLightbulbFill, BsFillLightbulbOffFill } from 'react-icons/bs';

const { ipcRenderer } = window.require('electron');

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
    // Theme manager
    const [theme, setTheme] = useState(localStorage.getItem('theme'));
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
            <div className="mx-1">
                <img
                    alt=""
                    src={process.env.PUBLIC_URL + "/icon.svg"}
                    width="24"
                    height="24"
                />
            </div>

            <Dropdown>
                <Dropdown.Toggle as={CustomToggle}>Project</Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item href="#">Create</Dropdown.Item>
                    <Dropdown.Item href="#">Load</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item href="#">Save</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <Dropdown>
                <Dropdown.Toggle as={CustomToggle}>Help</Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item href="#">Watch tutorial</Dropdown.Item>
                    <Dropdown.Item href="#">Discord support</Dropdown.Item>
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