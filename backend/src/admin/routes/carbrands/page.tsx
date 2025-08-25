import { defineRouteConfig } from "@medusajs/admin-sdk"
import { TagSolid } from "@medusajs/icons"
import {
    Container,
    Heading,
    createDataTableColumnHelper,
    DataTable,
    DataTablePaginationState,
    useDataTable,
    Drawer, Text, Button,
    Table
} from "@medusajs/ui"
import { useQuery } from "@tanstack/react-query"
import { sdk } from "../../lib/sdk"
import { useMemo, useState } from "react"
import { Link } from "react-router-dom"

const BrandsPage = () => {
    // TODO retrieve brands
    type Brand = {
        id: string
        name: string
    }
    type BrandsResponse = {
        brands: Brand[]
        count: number
        limit: number
        offset: number
    }

    const columnHelper = createDataTableColumnHelper<Brand>()

    const columns = [
        columnHelper.accessor("id", {
            header: "ID",
        }),
        columnHelper.accessor("name", {
            header: "Name",
        }),
        columnHelper.display({
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                console.log(row)
                return (
                    <>
                        <Drawer>
                            <Drawer.Trigger asChild>
                                <Button>Modellen</Button>
                            </Drawer.Trigger>

                            <Drawer.Content className="flex flex-col h-full max-h-screen">
                                {/* Sticky header */}
                                <Drawer.Header className="flex-shrink-0 border-b">
                                    <Drawer.Title>Edit Variant</Drawer.Title>
                                </Drawer.Header>

                                {/* Scrollable body */}
                                <Drawer.Body className="flex-1 overflow-y-auto p-4">
                                    <Table>
                                        <Table.Header>
                                            <Table.Row>
                                                <Table.HeaderCell>#</Table.HeaderCell>
                                                <Table.HeaderCell>Model</Table.HeaderCell>
                                                <Table.HeaderCell>Edit</Table.HeaderCell>
                                            </Table.Row>
                                        </Table.Header>
                                        <Table.Body>
                                            {row.original.carmodels.map((carmodel) => (
                                                <Table.Row
                                                    key={carmodel.id}
                                                    className="[&_td:last-child]:w-[1%] [&_td:last-child]:whitespace-nowrap"
                                                >
                                                    <Table.Cell>{carmodel.id}</Table.Cell>
                                                    <Table.Cell>{carmodel.name}</Table.Cell>
                                                    <Table.Cell>
                                                        <Link
                                                            to={`/carbrands/model/${carmodel.id}/`}
                                                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                                        >
                                                            go to car
                                                        </Link>
                                                    </Table.Cell>
                                                </Table.Row>
                                            ))}
                                        </Table.Body>
                                    </Table>
                                </Drawer.Body>

                                {/* Sticky footer */}
                                <Drawer.Footer className="flex-shrink-0 border-t">
                                    <Drawer.Close asChild>
                                        <Button variant="secondary">Cancel</Button>
                                    </Drawer.Close>
                                    <Button>Save</Button>
                                </Drawer.Footer>
                            </Drawer.Content>
                        </Drawer>

                    </>
                )
            },
        }),
    ]

    const limit = 15
    const [pagination, setPagination] = useState<DataTablePaginationState>({
        pageSize: limit,
        pageIndex: 0,
    })
    const offset = useMemo(() => {
        return pagination.pageIndex * limit
    }, [pagination])

    const { data, isLoading } = useQuery<BrandsResponse>({
        queryFn: () => sdk.client.fetch(`/admin/carbrands`, {
            query: {
                limit,
                offset,
            },
        }),
        queryKey: [["carbrands", limit, offset]],
    })

    const table = useDataTable({
        columns,
        data: data?.brands || [],
        getRowId: (row) => row.id,
        rowCount: data?.count || 0,
        isLoading,
        pagination: {
            state: pagination,
            onPaginationChange: setPagination,
        },
    })

    return (
        <Container className="divide-y p-0">
            <DataTable instance={table}>
                <DataTable.Toolbar className="flex flex-col items-start justify-between gap-2 md:flex-row md:items-center">
                    <Heading>Brands</Heading>
                </DataTable.Toolbar>
                <DataTable.Table />
                <DataTable.Pagination />
            </DataTable>
        </Container>
    )
}

export const config = defineRouteConfig({
    label: "Cars",
    icon: TagSolid,
})

export default BrandsPage