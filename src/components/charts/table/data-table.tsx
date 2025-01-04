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
            marketId: 1,
            symbol: "RELIANCE",
            holding: 10,
            rate: 200,
            amount: 2000, // holding * rate
            holdingDiff: 2, // Example difference from the previous month
            rateDiff: 10, // Example difference from the previous month
            amountDiff: 200, // Example difference from the previous month
            investedAmount: 1000, // Example of additional data
        },
        {
            isin: "INE467B01029",
            name: "Tata Consultancy Services",
            marketId: 1,
            symbol: "TCS",
            holding: 15,
            rate: 200,
            amount: 3000, // holding * rate
            holdingDiff: 1,
            rateDiff: 5,
            amountDiff: 75,
            investedAmount: 2000,
        },
        {
            isin: "INE062A01020",
            name: "State Bank of India",
            marketId: 1,
            symbol: "SBIN",
            holding: 20,
            rate: 75,
            amount: 1500, // holding * rate
            holdingDiff: -2,
            rateDiff: -5,
            amountDiff: -150,
            investedAmount: 500,
        },
        {
            isin: "INE154A01025",
            name: "Hindustan Unilever",
            marketId: 1,
            symbol: "HINDUNILVR",
            holding: 5,
            rate: 100,
            amount: 500, // holding * rate
            holdingDiff: 1,
            rateDiff: 0,
            amountDiff: 100,
            investedAmount: 1000,
        },
        {
            isin: "INE090A01021",
            name: "Infosys",
            marketId: 1,
            symbol: "INFY",
            holding: 25,
            rate: 100,
            amount: 2500, // holding * rate
            holdingDiff: 0,
            rateDiff: 5,
            amountDiff: 125,
            investedAmount: 2000,
        },
        {
            isin: "US0378331005",
            name: "Apple Inc.",
            marketId: 2,
            symbol: "AAPL",
            holding: 1,
            rate: 10,
            amount: 10, // holding * rate
            holdingDiff: 0,
            rateDiff: 0,
            amountDiff: 0,
            investedAmount: 1030,
        },
        {
            isin: "US0231351067",
            name: "Amazon.com Inc.",
            marketId: 2,
            symbol: "AMZN",
            holding: 2,
            rate: 2,
            amount: 4, // holding * rate
            holdingDiff: -1,
            rateDiff: 1,
            amountDiff: -1,
            investedAmount: 2300,
        },
        {
            isin: "US5949181045",
            name: "Microsoft Corp.",
            marketId: 2,
            symbol: "MSFT",
            holding: 1,
            rate: 11,
            amount: 11, // holding * rate
            holdingDiff: 0,
            rateDiff: 1,
            amountDiff: 1,
            investedAmount: 300,
        },
        {
            isin: "US67066G1040",
            name: "NVIDIA Corp.",
            marketId: 2,
            symbol: "NVDA",
            holding: 1,
            rate: 8,
            amount: 8, // holding * rate
            holdingDiff: 0,
            rateDiff: -2,
            amountDiff: -2,
            investedAmount: 10,
        },
        {
            isin: "US88160R1014",
            name: "Tesla Inc.",
            marketId: 2,
            symbol: "TSLA",
            holding: 18,
            rate: 8,
            amount: 144, // holding * rate
            holdingDiff: 2,
            rateDiff: 1,
            amountDiff: 26,
            investedAmount: 156,
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

