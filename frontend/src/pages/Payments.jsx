import { Download } from "lucide-react";
import { Button } from "../components/UI";
import { getToken, invoiceUrl } from "../services/api";
import CrudPage from "./CrudPage";

export default function Payments() {
  function downloadInvoice(id) {
    window.open(`${invoiceUrl(id)}?token=${getToken()}`, "_blank");
  }

  return (
    <CrudPage
      title="Payments"
      subtitle="Track payments and download PDF invoices"
      endpoint="/payments"
      rootKey="payments"
      initialForm={{ customerId: "", appointmentId: "", amount: 1500, method: "upi", status: "paid", transactionId: "" }}
      fields={[
        { name: "customerId", label: "Customer ID" },
        { name: "appointmentId", label: "Appointment ID" },
        { name: "amount", label: "Amount", type: "number" },
        { name: "method", label: "Method", type: "select", options: ["cash", "upi", "card", "bank_transfer"] },
        { name: "status", label: "Status", type: "select", options: ["pending", "paid", "failed", "refunded"] },
        { name: "transactionId", label: "Transaction ID" }
      ]}
      columns={[
        { key: "customer", label: "Customer", render: (row) => row.customerId?.name || row.customerId },
        { key: "amount", label: "Amount", render: (row) => `INR ${row.amount}` },
        { key: "method", label: "Method" },
        { key: "status", label: "Status", status: true },
        { key: "invoiceNumber", label: "Invoice" },
        { key: "action", label: "PDF", render: (row) => <Button variant="secondary" onClick={() => downloadInvoice(row._id)}><Download size={15} /> PDF</Button> }
      ]}
    />
  );
}
