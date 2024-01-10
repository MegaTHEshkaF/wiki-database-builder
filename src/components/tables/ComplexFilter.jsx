import React from 'react';

import { Form, InputGroup } from 'react-bootstrap';

const ComplexFilter = ({columns, setGlobalFilter, setColumnFilters}) => {
    const [selectedFilter, setSelectedFilter] = React.useState('All');
    const [filterValue, setFilterValue] = React.useState('');

    React.useEffect(() => {
        const intervalId = setTimeout(() => {
            setGlobalFilter('');
            setColumnFilters([]);

            if(selectedFilter === 'All') {
                setGlobalFilter(filterValue);
            }
            else {
                const column = columns.find(column => column.columnDef.header === selectedFilter);
                setColumnFilters([{
                    id: column.id,
                    value: filterValue,
                }]);
            }
        }, 750);
        return () => clearTimeout(intervalId);
    }, [columns, setGlobalFilter, setColumnFilters, selectedFilter, filterValue]);

    return (
        <InputGroup className="mb-3" size="sm">
            <InputGroup.Text>Filter by</InputGroup.Text>
            <Form.Select 
                value={selectedFilter} 
                onChange={e => setSelectedFilter(e.target.value)}
            >
                <option>All</option>
                {columns.map(column => (
                    column.getCanFilter() ? <option key={column.id}>{column.columnDef.header}</option> : null
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