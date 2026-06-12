import CrudPage from "./CrudPage";

export default function Astrologers() {
  return (
    <CrudPage
      title="Astrologers"
      subtitle="Manage astrologer profiles and login users"
      endpoint="/astrologers"
      rootKey="astrologers"
      initialForm={{ name: "", email: "", phone: "", password: "Astro@123", specialization: "", experienceYears: 0, consultationFee: 0 }}
      fields={[
        { name: "name", label: "Name" },
        { name: "email", label: "Email" },
        { name: "phone", label: "Phone" },
        { name: "password", label: "Password" },
        { name: "specialization", label: "Specialization" },
        { name: "experienceYears", label: "Experience Years", type: "number" },
        { name: "consultationFee", label: "Consultation Fee", type: "number" }
      ]}
      columns={[
        { key: "name", label: "Name" },
        { key: "phone", label: "Phone" },
        { key: "specialization", label: "Specialization" },
        { key: "consultationFee", label: "Fee" },
        { key: "status", label: "Status", status: true }
      ]}
    />
  );
}
