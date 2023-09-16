import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import MyNavLink from './MyNavLink';
import { NAVBAR_LINKS as navbarLinks } from './navbarLinks';


const VerticalNavbar = () => {
    return (    
        <Navbar bg='dark' className='vertical' variant='dark'>
            <Nav>
                {navbarLinks.map(navbarLinkProps => (
                    <MyNavLink key={navbarLinkProps.to} {...navbarLinkProps}/>
                ))}
            </Nav>
        </Navbar>
    );
}

export default React.memo(VerticalNavbar);