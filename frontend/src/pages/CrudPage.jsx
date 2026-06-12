import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Button, DataTable, Field, inputClass, Modal, PageHeader, Status } from "../components/UI";
import { api } from "../services/api";

export default function CrudPage({ title, endpoint, rootKey, columns, fields, initialForm, subtitle, adminOnlyCreate = false, canCreate = true, afterCreate }) {
  const [rows, setRows] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  async function load() {
    const data = await api(endpoint);
    setRows(data[rootKey] || []);
  }

  useEffect(() => {
    load().catch(console.error);
  }, [endpoint]);

  async function submit(event) {
    event.preventDefault();
    setError("");
    try {
      await api(endpoint, { method: "POST", body: form });
      setForm(initialForm);
      setShow(false);
      await load();
      afterCreate?.();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <>
      <PageHeader
        title={title}
        subtitle={subtitle}
        actions={canCreate && !adminOnlyCreate ? <Button onClick={() => setShow(true)}><Plus size={16} /> Add</Button> : canCreate ? <Button onClick={() => setShow(true)}><Plus size={16} /> Add</Button> : null}
      />
      <DataTable
        columns={columns.map((column) => ({
          ...column,
          render: column.status ? (row) => <Status value={row[column.key]} /> : column.render
        }))}
        rows={rows}
      />
      {show && (
        <Modal title={`Add ${title}`} onClose={() => setShow(false)}>
          {error && <div className="mb-4 rounded-md bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</div>}
          <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
            {fields.map((field) => (
              <Field key={field.name} label={field.label}>
                {field.type === "select" ? (
                  <select className={inputClass} value={form[field.name] || ""} onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}>
                    <option value="">Select</option>
                    {field.options.map((option) => <option key={option.value || option} value={option.value || option}>{option.label || option}</option>)}
                  </select>
                ) : (
                  <input
                    type={field.type || "text"}
                    className={inputClass}
                    value={form[field.name] || ""}
                    onChange={(e) => setForm({ ...form, [field.name]: field.type === "number" ? Number(e.target.value) : e.target.value })}
                  />
                )}
              </Field>
            ))}
            <div className="sm:col-span-2">
              <Button type="submit">Save</Button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
}
