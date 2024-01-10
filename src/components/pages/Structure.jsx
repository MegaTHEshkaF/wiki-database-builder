import React from 'react';

import { Container, Row, Col } from 'react-bootstrap';

import VirtualComplexTable from '../tables/VirtualComplexTable';

import { FILES_TABLE_COLUMNS } from '../tables/columns';
import { AssetsTableContext } from '../../context';

const Structure = () => {
    // const [data, setData] = React.useState(JSON.parse(fs.readFileSync('C:\\Users\\pachk\\Documents\\HellIsOthers\\WDB PROJECT\\cache\\MonoBehaviour.json'), 'utf8')); // For tests
    const { data } = React.useContext(AssetsTableContext);
    const columns = React.useMemo(() => FILES_TABLE_COLUMNS, []);


    return (
        <Container fluid className="structure g-0">
            <Row className="g-0">
                <Col className="g-0">
                    <section id="explorer">
                        <VirtualComplexTable data={data} columns={columns} />
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