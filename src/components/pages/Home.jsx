import React from 'react';

import { Button, Stack } from 'react-bootstrap';

const Home = () => {
    return (
        <section id="home">
            <div className="d-flex h-100 justify-content-center">
                <Stack direction="horizontal" gap={3}>
                    <Button size="lg">Create new project</Button>
                    <Button size="lg" variant="secondary">Open project</Button>
                </Stack>
            </div>
        </section>
    );
}

export default React.memo(Home);