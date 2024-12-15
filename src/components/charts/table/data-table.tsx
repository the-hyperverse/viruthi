"use client"

import * as React from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown } from 'lucide-react'

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
}



const r = {
    total: 10,
    data: [
        {
            isin: "INE123A01016",
            name: "Reliance Industries",
            isinName: "Reliance Industries INE123A01016",
            marketId: 1,
            symbol: "RELIANCE",
            amount: 2000,
        },
        {
            isin: "INE467B01029",
            name: "Tata Consultancy Services",
            isinName: "TCS INE467B01029",
            marketId: 1,
            symbol: "TCS",
            amount: 3000,
        },
        {
            isin: "INE062A01020",
            name: "State Bank of India",
            isinName: "SBI INE062A01020",
            marketId: 1,
            symbol: "SBIN",
            amount: 1500,
        },
        {
            isin: "INE154A01025",
            name: "Hindustan Unilever",
            isinName: "HUL INE154A01025",
            marketId: 1,
            symbol: "HINDUNILVR",
            amount: 500,
        },
        {
            isin: "INE090A01021",
            name: "Infosys",
            isinName: "Infosys INE090A01021",
            marketId: 1,
            symbol: "INFY",
            amount: 2500,
        },
        {
            isin: "US0378331005",
            name: "Apple Inc.",
            isinName: "Apple US0378331005",
            marketId: 2,
            symbol: "AAPL",
            amount: 10,
        },
        {
            isin: "US0231351067",
            name: "Amazon.com Inc.",
            isinName: "Amazon US0231351067",
            marketId: 2,
            symbol: "AMZN",
            amount: 5,
        },
        {
            isin: "US5949181045",
            name: "Microsoft Corp.",
            isinName: "Microsoft US5949181045",
            marketId: 2,
            symbol: "MSFT",
            amount: 15,
        },
        {
            isin: "US67066G1040",
            name: "NVIDIA Corp.",
            isinName: "NVIDIA US67066G1040",
            marketId: 2,
            symbol: "NVDA",
            amount: 20,
        },
        {
            isin: "US88160R1014",
            name: "Tesla Inc.",
            isinName: "Tesla US88160R1014",
            marketId: 2,
            symbol: "TSLA",
            amount: 12,
        },
    ]
}

export function DataTable<TData, TValue>({
    columns,
}: DataTableProps<TData, TValue>) {
    const [data, setData] = React.useState<TData[]>([])
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})
    const [pagination, setPagination] = React.useState({ pageIndex: 0, pageSize: 10 })
    const [totalItems, setTotalItems] = React.useState(0)

    const fetchData = React.useCallback(async () => {
        const params = new URLSearchParams({
            page: (pagination.pageIndex + 1).toString(),
            per_page: pagination.pageSize.toString(),
            sort: sorting.length > 0 ? sorting[0].id : 'email',
            order: sorting.length > 0 ? (sorting[0].desc ? 'desc' : 'asc') : 'asc',
            filter: columnFilters.find(filter => filter.id === 'email')?.value as string || '',
        })

        // const response = await fetch(`/api/payments?${params}`)
        // const result = await response.json()
        const result = r
        setData(result.data as TData[])
        setTotalItems(result.total)
    }, [pagination, sorting, columnFilters])

    React.useEffect(() => {
        fetchData()
    }, [fetchData])

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        onPaginationChange: setPagination,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
            pagination,
        },
        manualPagination: true,
        pageCount: Math.ceil(totalItems / pagination.pageSize),
    })

    return (
        <div className="w-full overflow-x-auto">
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filter name..."
                    value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("name")?.setFilterValue(event.target.value)
                    }
                    className="w-[250px]"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Columns <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="rounded-md border overflow-hidden">
                <Table className="min-w-full">
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-between space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    Showing {table.getRowModel().rows.length} of {totalItems} results
                </div>
                <div className="flex items-center space-x-6 lg:space-x-8">
                    <div className="flex items-center space-x-2">
                        <p className="text-sm font-medium">Rows per page</p>
                        <Select
                            value={`${table.getState().pagination.pageSize}`}
                            onValueChange={(value) => {
                                table.setPageSize(Number(value))
                            }}
                        >
                            <SelectTrigger className="h-8 w-[70px]">
                                <SelectValue placeholder={table.getState().pagination.pageSize} />
                            </SelectTrigger>
                            <SelectContent side="top">
                                {[10, 20, 30, 40, 50].map((pageSize) => (
                                    <SelectItem key={pageSize} value={`${pageSize}`}>
                                        {pageSize}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                        Page {table.getState().pagination.pageIndex + 1} of{" "}
                        {table.getPageCount()}
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="outline"
                            className="hidden h-8 w-8 p-0 lg:flex"
                            onClick={() => table.setPageIndex(0)}
                            disabled={!table.getCanPreviousPage()}
                        >
                            <span className="sr-only">Go to first page</span>
                            <ArrowUpDown className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            className="h-8 w-8 p-0"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            <span className="sr-only">Go to previous page</span>
                            <ChevronDown className="h-4 w-4 rotate-90" />
                        </Button>
                        <Button
                            variant="outline"
                            className="h-8 w-8 p-0"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            <span className="sr-only">Go to next page</span>
                            <ChevronDown className="h-4 w-4 -rotate-90" />
                        </Button>
                        <Button
                            variant="outline"
                            className="hidden h-8 w-8 p-0 lg:flex"
                            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                            disabled={!table.getCanNextPage()}
                        >
                            <span className="sr-only">Go to last page</span>
                            <ArrowUpDown className="h-4 w-4 rotate-180" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

