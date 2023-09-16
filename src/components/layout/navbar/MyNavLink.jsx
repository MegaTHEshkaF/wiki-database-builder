import React from 'react';
import { Nav, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const MyNavLink = ({to, title, icon, separator}) => {
    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            {title}
        </Tooltip>
    );
    
    return (    
        <OverlayTrigger
            placement="right"
            overlay={renderTooltip}
        >
            <div className={separator ? 'mt-auto' : ''}>
                <LinkContainer to={to}>
                    <Nav.Link active={false}> {/* To work properly with React Router Nav.Lnik must have active={false} property */}
                        {icon}
                    </Nav.Link>
                </LinkContainer>
            </div>
        </OverlayTrigger>
    );
}

export default React.memo(MyNavLink);