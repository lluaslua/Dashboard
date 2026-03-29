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


export type SystemStatus = "Online" | "Alerta" | "Offline"

export type SystemData = {
  id: string
  sistema: string
  cliente: string
  cidade: string
  producaoHoje: number
  eficiencia: number
  status: SystemStatus
  ultimaLeitura: string
}


const data: SystemData[] = [
  { id: "1", sistema: "Usina Solar Campinas", cliente: "Energética S.A.", cidade: "Campinas - SP", producaoHoje: 245.5, eficiencia: 97.8, status: "Online", ultimaLeitura: "há 2 min" },
  { id: "2", sistema: "Painel Residencial Vila Olímpia", cliente: "João Ferreira", cidade: "São Paulo - SP", producaoHoje: 32.1, eficiencia: 89.2, status: "Alerta", ultimaLeitura: "há 5 min" },
  { id: "3", sistema: "Sistema Industrial Jundiaí", cliente: "Indústria Beta Ltda", cidade: "Jundiaí - SP", producaoHoje: 512.8, eficiencia: 95.5, status: "Online", ultimaLeitura: "há 1 min" },
  { id: "4", sistema: "Fazenda Solar Ribeirão", cliente: "Agro Solar Corp", cidade: "Ribeirão Preto - SP", producaoHoje: 0.0, eficiencia: 0.0, status: "Offline", ultimaLeitura: "há 2 horas" },
  { id: "5", sistema: "Condomínio Green Tower", cliente: "Condomínio Green Tower", cidade: "Santos - SP", producaoHoje: 128.4, eficiencia: 92.1, status: "Online", ultimaLeitura: "há 3 min" },
  { id: "6", sistema: "Shopping Center Sorocaba", cliente: "Mall Group S.A.", cidade: "Sorocaba - SP", producaoHoje: 389.7, eficiencia: 88.5, status: "Alerta", ultimaLeitura: "há 7 min" },
]


export const columns: ColumnDef<SystemData>[] = [
  {
    accessorKey: "sistema",
    header: "Sistema",
    cell: ({ row }) => <span className="font-semibold text-gray-900">{row.getValue("sistema")}</span>,
  },
  {
    accessorKey: "cliente",
    header: "Cliente",
    cell: ({ row }) => <span className="text-gray-500">{row.getValue("cliente")}</span>,
  },
  {
    accessorKey: "cidade",
    header: "Cidade",
    cell: ({ row }) => <span className="text-gray-500">{row.getValue("cidade")}</span>,
  },
  {
    accessorKey: "producaoHoje",
    header: () => <div className="text-right">Produção Hoje</div>,
    cell: ({ row }) => {
      const valor = parseFloat(row.getValue("producaoHoje"))
      return <div className="text-right font-medium text-gray-900">{valor.toFixed(1)} kWh</div>
    },
  },
  {
    accessorKey: "eficiencia",
    header: () => <div className="text-right">Eficiência</div>,
    cell: ({ row }) => {
      const valor = parseFloat(row.getValue("eficiencia"))
      return <div className="text-right font-medium text-gray-900">{valor.toFixed(1)}%</div>
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as SystemStatus
      
     
      const statusStyles = {
        Online: "bg-green-50 text-green-700 hover:bg-green-50 border-green-200",
        Alerta: "bg-yellow-50 text-yellow-700 hover:bg-yellow-50 border-yellow-200",
        Offline: "bg-red-50 text-red-700 hover:bg-red-50 border-red-200",
      }
      const dotStyles = {
        Online: "bg-green-500",
        Alerta: "bg-yellow-500",
        Offline: "bg-red-500",
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
    accessorKey: "ultimaLeitura",
    header: () => <div className="text-right">Última Leitura</div>,
    cell: ({ row }) => <div className="text-right text-gray-500">{row.getValue("ultimaLeitura")}</div>,
  },
]


export function SystemsDataTable() {
  const table = useReactTable({
    data,
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