import React from 'react';

import { Navbar, Nav } from 'react-bootstrap';
import { NAVBAR_LINKS as navbarLinks } from './navbarLinks';
import MyNavLink from './MyNavLink';


const VerticalNavbar = () => {
    return (    
        <Navbar className='vertical'>
            <Nav>
                {navbarLinks.map(navbarLinkProps => (
                    <MyNavLink key={navbarLinkProps.to} {...navbarLinkProps}/>
                ))}
            </Nav>
        </Navbar>
    );
}

export default React.memo(VerticalNavbar);