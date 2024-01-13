import React from 'react';

import { Container, Row, Col } from 'react-bootstrap';

import ExplorerTable from '../explorer/ExplorerTable';

import { FILES_TABLE_COLUMNS } from '../explorer/columns';
import { ExplorerContext } from '../../context';
import ExplorerWindow from '../explorer/ExplorerWindow';

const fs = window.require('fs');
const readUnityFile = require('../../utils/readUnityFile');

const Structure = () => {
    // FOR TESTS
    const [tableData, setData] = React.useState(JSON.parse(fs.readFileSync('C:\\Users\\pachk\\Documents\\HellIsOthers\\WDB PROJECT\\cache\\MonoBehaviour.json'), 'utf8'));
    const [windowData, setWindowData] = React.useState({});

    React.useEffect(() => {
        async function fetchData() {
            const file = await readUnityFile('C:\\Users\\pachk\\Documents\\HellIsOthers\\ExportedProject\\Assets\\MonoBehaviour\\Weapon_MissHarvey++.asset');
            setWindowData(file[0]);
        }
        fetchData();
    },[]);
    //

    // const { tableData, windowData } = React.useContext(ExplorerContext);
    const columns = React.useMemo(() => FILES_TABLE_COLUMNS, []);


    return (
        <Container fluid className="structure g-0">
            <Row className="g-0">
                <Col className="g-0">
                    <section id="explorer">
                        <ExplorerTable data={tableData} columns={columns} />
                    </section>
                </Col>
                <Col className="g-0">
                    <section id="explorer">
                        <ExplorerWindow data={windowData} />
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