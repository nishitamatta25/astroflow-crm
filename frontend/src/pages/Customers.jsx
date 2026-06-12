import CrudPage from "./CrudPage";

export default function Customers() {
  return (
    <CrudPage
      title="Customers"
      subtitle="Customer profiles with birth details"
      endpoint="/customers"
      rootKey="customers"
      initialForm={{ name: "", phone: "", email: "", gender: "female", dateOfBirth: "", timeOfBirth: "", placeOfBirth: "", address: "", notes: "" }}
      fields={[
        { name: "name", label: "Name" },
        { name: "phone", label: "Phone" },
        { name: "email", label: "Email" },
        { name: "gender", label: "Gender", type: "select", options: ["male", "female", "other", "prefer_not_to_say"] },
        { name: "dateOfBirth", label: "Date of Birth", type: "date" },
        { name: "timeOfBirth", label: "Time of Birth", type: "time" },
        { name: "placeOfBirth", label: "Place of Birth" },
        { name: "address", label: "Address" },
        { name: "notes", label: "Notes" }
      ]}
      columns={[
        { key: "name", label: "Name" },
        { key: "phone", label: "Phone" },
        { key: "email", label: "Email" },
        { key: "placeOfBirth", label: "Birth Place" },
        { key: "createdAt", label: "Created", render: (row) => row.createdAt?.slice(0, 10) }
      ]}
    />
  );
}
