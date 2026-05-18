export interface Column<T> {
  header: string
  render: (row: T) => React.ReactNode
}

export const DataTable = <T,>({ rows, columns }: { rows: T[]; columns: Column<T>[] }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full text-left text-sm">
      <thead className="bg-slate-100">
        <tr>{columns.map((col) => <th key={col.header} className="px-3 py-2 font-semibold">{col.header}</th>)}</tr>
      </thead>
      <tbody>
        {rows.map((row, idx) => (
          <tr key={idx} className="border-b border-slate-100">
            {columns.map((col) => (
              <td key={col.header} className="px-3 py-2 align-top">{col.render(row)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)
