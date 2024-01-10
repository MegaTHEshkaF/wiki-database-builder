import React from 'react';

import { useReactTable, getCoreRowModel, getSortedRowModel, getFilteredRowModel, flexRender } from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';

import ComplexFilter from './ComplexFilter';

const VirtualComplexTable = ({data, columns}) => {
    const [globalFilter, setGlobalFilter] = React.useState('');
    const [columnFilters, setColumnFilters] = React.useState([]);

    const table = useReactTable({
        data,
        columns, 
        state: {
            globalFilter,
            columnFilters,
        },
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        columnResizeMode: "onChange",
    });

    const { rows } = table.getRowModel();

    const tableContainerRef = React.useRef(null);

    const rowVirtualizer = useVirtualizer({
        count: rows.length,
        estimateSize: () => 16,
        getScrollElement: () => tableContainerRef.current,
        measureElement:
            typeof window !== 'undefined' &&
            navigator.userAgent.indexOf('Firefox') === -1
                ? element => element?.getBoundingClientRect().height
                : undefined,
        overscan: 5,
    });

    return (
        <>
            <ComplexFilter columns={table.getAllColumns()} setGlobalFilter={setGlobalFilter} setColumnFilters={setColumnFilters} />

            <div className="table-container" ref={tableContainerRef}>
                { rows.length !== 0
                    ? <table className="my-table" style={{width: table.getTotalSize()}}>
                        <thead>
                            {table.getHeaderGroups().map(headerGroup => (
                                <tr className="tr" key={headerGroup.id}>
                                    {headerGroup.headers.map(header => (
                                        <th className="th" key={header.id} style={{width: header.getSize()}}>
                                            <span onClick={header.column.getToggleSortingHandler()}>{header.column.columnDef.header}
                                                {
                                                    {
                                                        asc: " ⯅",
                                                        desc: " ⯆",
                                                    }[header.column.getIsSorted()]
                                                }
                                            </span>
                                            <div 
                                                className={`resizer ${header.column.getIsResizing() ? "isResizing" : ""}`}
                                                onMouseDown={header.getResizeHandler()}
                                                onTouchStart={header.getResizeHandler()}
                                            />
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody style={{height: `${rowVirtualizer.getTotalSize()}px`}}>
                            {rowVirtualizer.getVirtualItems().map(virtualRow => {
                                const row = rows[virtualRow.index];
                                return (
                                    <tr 
                                        className="tr" 
                                        data-index={virtualRow.index}
                                        ref={node => rowVirtualizer.measureElement(node)}
                                        key={row.id}
                                        style={{
                                            transform: `translateY(${virtualRow.start}px)`,
                                        }}
                                    >
                                        {row.getVisibleCells().map(cell => (
                                            <td className="td" key={cell.id} style={{width: cell.column.getSize()}}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </td>
                                        ))}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                : <div className='h-100 d-flex fs-2 justify-content-center align-items-center text-muted'>Nothing found</div> }
            </div>
        </>
    );
}

export default React.memo(VirtualComplexTable);