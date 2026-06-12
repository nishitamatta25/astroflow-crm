export function PageHeader({ title, actions, subtitle }) {
  return (
    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold text-ink">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}

export function Button({ children, variant = "primary", ...props }) {
  const styles = variant === "secondary"
    ? "border border-line bg-white text-slate-700 hover:bg-slate-50"
    : "bg-brand text-white hover:bg-blue-700";
  return <button {...props} className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold ${styles} ${props.className || ""}`}>{children}</button>;
}

export function Metric({ label, value }) {
  return (
    <div className="rounded-md border border-line bg-white p-4">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-semibold">{value ?? 0}</p>
    </div>
  );
}

export function DataTable({ columns, rows, empty = "No records found" }) {
  return (
    <div className="overflow-hidden rounded-md border border-line bg-white">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>{columns.map((col) => <th key={col.key} className="px-4 py-3 font-semibold">{col.label}</th>)}</tr>
          </thead>
          <tbody className="divide-y divide-line">
            {rows?.length ? rows.map((row, index) => (
              <tr key={row._id || index} className="hover:bg-slate-50">
                {columns.map((col) => <td key={col.key} className="px-4 py-3">{col.render ? col.render(row) : row[col.key]}</td>)}
              </tr>
            )) : (
              <tr><td className="px-4 py-8 text-center text-slate-500" colSpan={columns.length}>{empty}</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function Status({ value }) {
  return <span className={`status status-${value}`}>{value}</span>;
}

export function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-slate-600">{label}</span>
      {children}
    </label>
  );
}

export const inputClass = "w-full rounded-md border border-line bg-white px-3 py-2 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-blue-100";

export function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/30 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-md bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button className="rounded-md border border-line px-2 py-1 text-sm" onClick={onClose}>Close</button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}
