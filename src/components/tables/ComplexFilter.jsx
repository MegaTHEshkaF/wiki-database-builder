import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';

const ComplexFilter = ({columns, setGlobalFilter, setFilter, setAllFilters }) => {
    const [selectedFilter, setSelectedFilter] = React.useState('All');
    const [filterValue, setFilterValue] = React.useState('');

    React.useEffect(() => {
        const timeoutReference = setTimeout(() => {
            setGlobalFilter('');
            setAllFilters([]);

            if(selectedFilter === 'All')
                setGlobalFilter(filterValue);
            else
                setFilter(columns.find(e => e.Header === selectedFilter).accessor, filterValue);
        }, 750);
        return () => clearTimeout(timeoutReference);
    }, [setGlobalFilter, setAllFilters, columns, setFilter, selectedFilter, filterValue]);

    return (
        <InputGroup className="mb-3" size="sm">
            <InputGroup.Text>Filter by</InputGroup.Text>
            <Form.Select 
                value={selectedFilter} 
                onChange={e => setSelectedFilter(e.target.value)}
            >
                <option>All</option>
                {columns.map((column) => (
                    column.disableFilters ? null : (<option key={column.accessor}>{column.Header}</option>)
                ))}
            </Form.Select>
            <Form.Control 
                value={filterValue} 
                onChange={e => setFilterValue(e.target.value)} 
                style={{width: '40%'}}
            />
        </InputGroup>
    );
}

export default React.memo(ComplexFilter);