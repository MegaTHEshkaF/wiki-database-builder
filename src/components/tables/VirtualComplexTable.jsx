import React from 'react';
import { useTable, useFilters, useGlobalFilter, useSortBy, useBlockLayout, useRowSelect } from 'react-table';
import ComplexFilter from './ComplexFilter';

import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import scrollbarWidth from './scrollbarWidth';

import { ProjectContext } from './../../context/index';

const path = window.require('path');
const readUnityFile = require('./../../utils/readUnityFile');

const VirtualComplexTable = ({columns, data, setWindowData}) => {
    const scrollBarSize = React.useMemo(() => scrollbarWidth(), []);
    const { project } = React.useContext(ProjectContext);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        totalColumnsWidth,
        prepareRow,
        setFilter,
        setGlobalFilter,
        setAllFilters,
        toggleAllRowsSelected,
    } = useTable({ columns, data }, useFilters, useGlobalFilter, useSortBy, useBlockLayout, useRowSelect);

    const RenderRow = React.useCallback(
        ({ index, style }) => {
            const row = rows[index];
            prepareRow(row);
            return (
                <>
                    <div
                        {...row.getRowProps({
                            style,
                        })}
                        className={row.isSelected ? 'tr active' : 'tr'}
                        onClick={(event) => {
                            // Highlight row on click
                            const current = row.isSelected;
                            toggleAllRowsSelected(false);
                            if (!current) {
                                const rowDivs = document.querySelectorAll('.table .tr');
                                rowDivs.forEach(row => row.classList.remove('active'));
                                row.toggleRowSelected();
                                event.currentTarget.classList.add('active');
                            }
                            // Set window data
                            // TODO
                            // automaticly wipe window data after another click
                            const size = row.values.size.split(" ");
                            if((size[1] == 'KB' && parseInt(size[0]) > 100) || size[1] == 'MB' || size[1] == 'GB') {
                                return setWindowData('The file is too big! It will not be shown to avoid memory leak.');
                            }

                            readUnityFile(path.join(project.importDir, '\\ExportedProject\\Assets\\MonoBehaviour\\', row.values.name)).then(result => {
                                setWindowData(JSON.stringify(result[0].MonoBehaviour, null, 4));
                            });
                        }}
                    >
                        {row.cells.map(cell => {
                            return (
                                <div {...cell.getCellProps()} className='td'>
                                    {cell.render('Cell')}
                                </div>
                            );
                        })}
                    </div>
                </>
            );
        },
        [prepareRow, rows]
    );

    return (
        <>
            <ComplexFilter columns={columns} setGlobalFilter={setGlobalFilter} setFilter={setFilter} setAllFilters={setAllFilters} />
            <div className='virtual-complex-table'>
                {rows.length !== 0
                    ? <AutoSizer disableWidth>
                        {({ height }) => (
                            <div {...getTableProps()} className='table compact'>
                                <div>
                                    {headerGroups.map(headerGroup => (
                                        <div {...headerGroup.getHeaderGroupProps()} className='tr'>
                                            {headerGroup.headers.map(column => (
                                                <div {...column.getHeaderProps(column.getSortByToggleProps())} className='th'>
                                                    {column.render('Header')}
                                                    <span className='arrow'>
                                                        {column.isSorted ? (column.isSortedDesc ? ' ⯅' : ' ⯆') : ''}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>

                                <div {...getTableBodyProps()}>
                                    <FixedSizeList
                                        height={height}
                                        itemCount={rows.length}
                                        itemSize={20}
                                        width={totalColumnsWidth + scrollBarSize}
                                    >
                                        {RenderRow}
                                    </FixedSizeList>
                                </div>
                            </div>
                        )}
                    </AutoSizer>
                    : <div className='h-100 d-flex fs-2 justify-content-center align-items-center text-muted'>Nothing found</div>
                }
            </div>
        </>
    );
}

export default React.memo(VirtualComplexTable);