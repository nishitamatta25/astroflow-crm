import CrudPage from "./CrudPage";

export default function Appointments() {
  return (
    <CrudPage
      title="Appointments"
      subtitle="Schedule, confirm, complete, and cancel consultations"
      endpoint="/appointments"
      rootKey="appointments"
      initialForm={{ customerId: "", astrologerId: "", date: "", startTime: "", endTime: "", consultationType: "", fee: 1500, status: "pending", meetingLink: "" }}
      fields={[
        { name: "customerId", label: "Customer ID" },
        { name: "astrologerId", label: "Astrologer ID" },
        { name: "date", label: "Date", type: "date" },
        { name: "startTime", label: "Start Time", type: "time" },
        { name: "endTime", label: "End Time", type: "time" },
        { name: "consultationType", label: "Consultation Type" },
        { name: "fee", label: "Fee", type: "number" },
        { name: "status", label: "Status", type: "select", options: ["pending", "confirmed", "completed", "cancelled"] },
        { name: "meetingLink", label: "Meeting Link" }
      ]}
      columns={[
        { key: "customer", label: "Customer", render: (row) => row.customerId?.name || row.customerId },
        { key: "astrologer", label: "Astrologer", render: (row) => row.astrologerId?.name || row.astrologerId },
        { key: "date", label: "Date", render: (row) => row.date?.slice(0, 10) },
        { key: "time", label: "Time", render: (row) => `${row.startTime} - ${row.endTime}` },
        { key: "status", label: "Status", status: true },
        { key: "paymentStatus", label: "Payment", status: true }
      ]}
    />
  );
}
