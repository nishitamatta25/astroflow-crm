import { useState } from "react";
import { Button } from "../components/UI";
import { api } from "../services/api";
import CrudPage from "./CrudPage";

export default function Leads() {
  const [refresh, setRefresh] = useState(0);
  async function convert(id) {
    await api(`/leads/${id}/convert`, { method: "POST" });
    setRefresh((value) => value + 1);
  }

  return (
    <CrudPage
      key={refresh}
      title="Leads"
      subtitle="Track and convert potential customers"
      endpoint="/leads"
      rootKey="leads"
      initialForm={{ name: "", phone: "", email: "", source: "website", interest: "", status: "new", notes: "" }}
      fields={[
        { name: "name", label: "Name" },
        { name: "phone", label: "Phone" },
        { name: "email", label: "Email" },
        { name: "source", label: "Source", type: "select", options: ["website", "referral", "social_media", "walk_in", "other"] },
        { name: "interest", label: "Interest" },
        { name: "status", label: "Status", type: "select", options: ["new", "contacted", "qualified", "converted", "lost"] },
        { name: "notes", label: "Notes" }
      ]}
      columns={[
        { key: "name", label: "Name" },
        { key: "phone", label: "Phone" },
        { key: "interest", label: "Interest" },
        { key: "status", label: "Status", status: true },
        { key: "action", label: "Action", render: (row) => row.status !== "converted" ? <Button variant="secondary" onClick={() => convert(row._id)}>Convert</Button> : "Converted" }
      ]}
    />
  );
}
