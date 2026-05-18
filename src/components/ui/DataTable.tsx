import type { ReactNode } from 'react'

interface Column<T> {
  key: string
  header: string
  render: (row: T) => ReactNode
}

interface DataTableProps<T> {
  columns: Column<T>[]
  rows: T[]
}

const DataTable = <T,>({ columns, rows }: DataTableProps<T>) => (
  <div className="overflow-x-auto rounded-xl border border-slate-200">
    <table className="min-w-full text-left text-sm">
      <thead className="bg-slate-50 text-xs uppercase text-slate-600">
        <tr>
          {columns.map((column) => (
            <th key={column.key} className="px-3 py-2">
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={index} className="border-t border-slate-100">
            {columns.map((column) => (
              <td key={column.key} className="px-3 py-2">
                {column.render(row)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

export default DataTable
