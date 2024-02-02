import React from 'react';

import { useReactTable, getCoreRowModel, getSortedRowModel, getFilteredRowModel, flexRender } from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';

import ComplexFilter from './ComplexFilter';

import { ExplorerContext } from '../../context';

import { Menu, Item, useContextMenu } from "react-contexify";

const readUnityFile = require('../../utils/readUnityFile');

const ExplorerTable = ({data, columns}) => {
    // ФИЛЬТРЫ И ВЫБРАННЫЕ СТРОКИ СБРАСЫВАЮТСЯ ПРИ ИСПОЛЬЗОВАНИИ ROUTE
    // ПОПРОБОВАТЬ ПЕРЕНЕСТИ НА REDUX
    const [globalFilter, setGlobalFilter] = React.useState('');
    const [columnFilters, setColumnFilters] = React.useState([]);
    const [rowSelection, setRowSelection] = React.useState([]);

    const { setWindowData } = React.useContext(ExplorerContext);

    const table = useReactTable({
        data,
        columns, 
        state: {
            globalFilter,
            columnFilters,
            rowSelection,
        },
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        columnResizeMode: "onChange",
        onRowSelectionChange: setRowSelection,
        enableRowSelection: true,
        enableMultiRowSelection: false,
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

    const { show } = useContextMenu({ id: 'table-cell' });
    function displayMenu(e) {
        show({
            event: e,
        });
    }
    function handleItemClick({ id, triggerEvent }) {
        switch (id) {
            case "copy-text":
                navigator.clipboard.writeText(triggerEvent.target.textContent);
                break;
        }
    }

    React.useEffect(() => {
        async function fetchData() {
            if(!table.getIsSomeRowsSelected()) return;

            const file = await readUnityFile(table.getSelectedRowModel().flatRows[0].original.path);
            setWindowData(file[0]);
        }
        fetchData();
    }, [setWindowData, rowSelection, table]);

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
                                        className={`tr ${row.getIsSelected() ? "selected" : ""}`}
                                        data-index={virtualRow.index}
                                        ref={node => rowVirtualizer.measureElement(node)}
                                        key={row.id}
                                        style={{
                                            transform: `translateY(${virtualRow.start}px)`,
                                        }}
                                        onClick={row.getToggleSelectedHandler()}
                                        onContextMenu={row.getToggleSelectedHandler()}
                                    >
                                        {row.getVisibleCells().map(cell => (
                                            <td className="td" key={cell.id} style={{width: cell.column.getSize()}} onContextMenu={displayMenu}>
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
            
            <Menu id="table-cell" animation={false}>
                <Item onClick={handleItemClick} id="copy-text">Copy text</Item>
            </Menu>
        </>
    );
}

export default React.memo(ExplorerTable);