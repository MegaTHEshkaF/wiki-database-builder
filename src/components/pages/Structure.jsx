import React from 'react';

import { Container, Row, Col } from 'react-bootstrap';

const Structure = () => {
    return (
        <Container fluid className="structure g-0">
            <Row className="g-0">
                <Col className="g-0">
                    <section id="explorer">
                        1
                    </section>
                </Col>
                <Col className="g-0">
                    <section id="explorer">
                        2
                    </section>
                </Col>
            </Row>
            <Row className="g-0">
                <Col className="g-0">
                    <section id="database">
                        3
                    </section>
                </Col>
                <Col className="g-0">
                    <section id="database">
                        4
                    </section>
                </Col>
            </Row>
        </Container>
    );
}

export default React.memo(Structure);