function compareFileSize(rowA, rowB, id, desc) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

    // File type
    const rowAValue = rowA.values[id].split(" ");
    rowAValue[1] = sizes.indexOf(rowAValue[1]);
    rowAValue[0] = parseFloat(rowAValue[0]);

    // File size
    const rowBValue = rowB.values[id].split(" ");
    rowBValue[1] = sizes.indexOf(rowBValue[1]);
    rowBValue[0] = parseFloat(rowBValue[0]);

    // Compare type
    if (rowAValue[1] > rowBValue[1]) return 1;
    if (rowBValue[1] > rowAValue[1]) return -1;

    // Copmpare size
    if (rowAValue[0] > rowBValue[0]) return 1;
    if (rowBValue[0] > rowAValue[0]) return -1;

    return 0;
}

export const FILES_TABLE_COLUMNS = [
    {
        Header: "ID",
        accessor: "id",
        width: 40,
    },
    {
        Header: "Name",
        accessor: "name",
        width: 300,
    },
    {
        Header: "Container",
        accessor: "container",
        width: 550,
    },
    {
        Header: "Size",
        accessor: "size",
        disableFilters: true,
        disableGlobalFilter: true,
        sortType: compareFileSize,
        width: 70,
    },
]