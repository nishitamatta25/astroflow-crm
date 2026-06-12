import CrudPage from "./CrudPage";

export default function Consultations() {
  return (
    <CrudPage
      title="Consultations"
      subtitle="Astrologer notes and remedies"
      endpoint="/consultations"
      rootKey="consultations"
      initialForm={{ appointmentId: "", summary: "", problemsDiscussed: "", remediesSuggested: "", followUpRecommendation: "", privateNotes: "" }}
      fields={[
        { name: "appointmentId", label: "Appointment ID" },
        { name: "summary", label: "Summary" },
        { name: "problemsDiscussed", label: "Problems Discussed" },
        { name: "remediesSuggested", label: "Remedies Suggested" },
        { name: "followUpRecommendation", label: "Follow Up" },
        { name: "privateNotes", label: "Private Notes" }
      ]}
      columns={[
        { key: "customer", label: "Customer", render: (row) => row.customerId?.name || row.customerId },
        { key: "summary", label: "Summary" },
        { key: "followUpRecommendation", label: "Follow Up" },
        { key: "createdAt", label: "Created", render: (row) => row.createdAt?.slice(0, 10) }
      ]}
    />
  );
}
