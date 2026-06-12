import CrudPage from "./CrudPage";

export default function Availability() {
  return (
    <CrudPage
      title="Availability"
      subtitle="Working slots used by appointment validation"
      endpoint="/availability"
      rootKey="availability"
      initialForm={{ astrologerId: "", dayOfWeek: 1, startTime: "10:00", endTime: "18:00", slotDurationMinutes: 45 }}
      fields={[
        { name: "astrologerId", label: "Astrologer ID" },
        { name: "dayOfWeek", label: "Day of Week", type: "select", options: [
          { value: 0, label: "Sunday" }, { value: 1, label: "Monday" }, { value: 2, label: "Tuesday" }, { value: 3, label: "Wednesday" }, { value: 4, label: "Thursday" }, { value: 5, label: "Friday" }, { value: 6, label: "Saturday" }
        ] },
        { name: "startTime", label: "Start Time", type: "time" },
        { name: "endTime", label: "End Time", type: "time" },
        { name: "slotDurationMinutes", label: "Slot Duration", type: "number" }
      ]}
      columns={[
        { key: "astrologer", label: "Astrologer", render: (row) => row.astrologerId?.name || row.astrologerId },
        { key: "dayOfWeek", label: "Day" },
        { key: "startTime", label: "Start" },
        { key: "endTime", label: "End" },
        { key: "isActive", label: "Active", render: (row) => row.isActive ? "Yes" : "No" }
      ]}
    />
  );
}
