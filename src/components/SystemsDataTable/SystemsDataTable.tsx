"use client"

import * as React from "react"
import { Filter, ChevronDown } from "lucide-react"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { EnergySystem, SystemStatus } from "@/types/energy-system"
import { timeFormatter, timeElapsed } from "@/utils/time-utils"
import { calculateDailyEnergy } from "@/utils/stats-utils"

interface SystemsDataTableProps {
  systems: EnergySystem[];
}



export const columns: ColumnDef<EnergySystem>[] = [
  {
    accessorKey: "name",
    header: "Sistema",
    cell: ({ row }) => <span className="font-semibold text-gray-900">{row.getValue("name")}</span>,
  },
  {
    accessorKey: "customer",
    header: "Cliente",
    cell: ({ row }) => <span className="text-gray-500">{row.getValue("customer")}</span>,
  },
  {
    accessorKey: "city",
    header: "Cidade",
    cell: ({ row }) => <span className="text-gray-500">{row.getValue("city")}</span>,
  },
  {
    accessorKey: "hourlyProduction",
    header: () => <div className="text-right">Produção Hoje</div>,
    cell: ({ row }) => {
      const value = calculateDailyEnergy(parseFloat(row.getValue("hourlyProduction")))
      return <div className="text-right font-medium text-gray-900">{value.toFixed(1)} kWh</div>
    },
  },
  {
    accessorKey: "efficiency",
    header: () => <div className="text-right">Eficiência</div>,
    cell: ({ row }) => {
      const value = parseFloat(row.getValue("efficiency"))
      return <div className="text-right font-medium text-gray-900">{value.toFixed(1)}%</div>
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as SystemStatus
      
     
      const statusStyles = {
        ONLINE: "bg-green-50 text-green-700 hover:bg-green-50 border-green-200",
        ALERT: "bg-yellow-50 text-yellow-700 hover:bg-yellow-50 border-yellow-200",
        OFFLINE: "bg-red-50 text-red-700 hover:bg-red-50 border-red-200",
      }
      const dotStyles = {
        ONLINE: "bg-green-500",
        ALERT: "bg-yellow-500",
        OFFLINE: "bg-red-500",
      }

      return (
        <Badge variant="outline" className={`gap-1.5 font-medium border-0 shadow-none ${statusStyles[status]}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${dotStyles[status]}`} />
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: "updatedAt",
    header: () => <div className="text-right">Última Leitura</div>,
    cell: ({ row }) => <div className="text-right text-gray-500">{timeFormatter(timeElapsed(row.getValue("updatedAt")))}</div>,
  },
]


export function SystemsDataTable({ systems }: SystemsDataTableProps) {
  const table = useReactTable({
    data: systems, 
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <Card className="border border-gray-100 shadow-sm p-8">
      
      <CardHeader className="flex flex-row items-center justify-between pb-6">
        <div>
          <CardTitle className="text-lg font-semibold text-gray-900">
            Sistemas em Monitoramento
          </CardTitle>
          <CardDescription className="text-sm text-gray-500 mt-1">
            Visão geral de todos os sistemas fotovoltaicos
          </CardDescription>
        </div>
        
        
        <div className="flex gap-2">
          <Button variant="outline" className="h-9 gap-2 text-gray-600 font-normal bg-gray-50/50 border-gray-200">
            <Filter className="h-4 w-4" />
            Todos
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </Button>
          <Button variant="outline" className="h-9 gap-2 text-gray-600 font-normal bg-gray-50/50 border-gray-200">
            Todas
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent border-gray-100">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-gray-900 font-semibold text-xs h-10">
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
                  className="border-gray-100"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-4 text-sm">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Sem resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}