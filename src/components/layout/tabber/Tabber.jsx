import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { setSelectedIndex } from '../../../features/tabberSlice';

import { Navbar, Nav } from 'react-bootstrap';
import { NAVBAR_LINKS as navbarLinks } from './navbarLinks';
import MyNavLink from './MyNavLink';

const Tabber = () => {
    const dispatch = useDispatch();
    const selectedIndex = useSelector((state) => state.navbar.selectedIndex);
    
    return (
        <div className="tabber">
            <Navbar className="vertical">
                <Nav>
                    {navbarLinks.map(navbarLinkProps => (
                        <MyNavLink key={navbarLinkProps.title} onClick={() => dispatch(setSelectedIndex(navbarLinks.indexOf(navbarLinkProps)))} {...navbarLinkProps}/>
                    ))}
                </Nav>
            </Navbar>
            
            <div className="tabs">
                {navbarLinks.map(navbarLinkProps => (
                    <div key={navbarLinkProps.title} className={selectedIndex === navbarLinks.indexOf(navbarLinkProps) ? "tab active" : "tab"}>
                        {navbarLinkProps.content}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default React.memo(Tabber);