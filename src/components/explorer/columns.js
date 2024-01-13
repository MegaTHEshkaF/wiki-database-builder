export const FILES_TABLE_COLUMNS = [
    {
        header: "ID",
        accessorKey: "id",
        cell: (props) => props.getValue(),
        size: 60,
        minSize: 60,
    },
    {
        header: "Name",
        accessorKey: "name",
        cell: (props) => props.getValue(),
        size: 250,
        minSize: 100,
    },
    {
        header: "Container",
        accessorKey: "container",
        cell: (props) => props.getValue(),
        size: 350,
        minSize: 100,
    },
    {
        header: "Size",
        accessorKey: "sizeDisplay",
        cell: (props) => props.getValue(),
        size: 60,
        minSize: 60,
        sortingFn: (rowA, rowB) => {
            const numA = rowA.original.size;
            const numB= rowB.original.size;
        
            return numA < numB ? -1 : numA > numB ? 1 : 0;
        },
        enableColumnFilter: false,
        enableGlobalFilter: false,
    },
]