import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { DataTable, Metric, PageHeader, Status } from "../components/UI";
import { useAuth } from "../context/AuthContext";
import { api } from "../services/api";

export default function Dashboard() {
  const { user } = useAuth();
  const [data, setData] = useState(null);

  useEffect(() => {
    api(`/dashboard/${user.role}`).then(setData).catch(console.error);
  }, [user.role]);

  const metrics = data?.metrics || {};
  const metricLabels = user.role === "admin"
    ? [["Leads", metrics.leads], ["Customers", metrics.customers], ["Astrologers", metrics.astrologers], ["Revenue", `INR ${metrics.revenue || 0}`], ["Pending Payments", metrics.pendingPayments], ["Appointments", metrics.todaysAppointments]]
    : [["Today", metrics.todaysAppointments], ["Upcoming", metrics.upcomingAppointments], ["Completed", metrics.completedConsultations], ["Pending Notes", metrics.pendingNotes]];

  return (
    <>
      <PageHeader title={`${user.role === "admin" ? "Admin" : "Astrologer"} Dashboard`} subtitle="Live operational summary" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
        {metricLabels.map(([label, value]) => <Metric key={label} label={label} value={value} />)}
      </div>
      <div className="mt-5 grid gap-5 xl:grid-cols-2">
        <div className="rounded-md border border-line bg-white p-4">
          <h2 className="mb-4 font-semibold">{user.role === "admin" ? "Revenue Trend" : "Completed Consultations"}</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data?.revenueTrend || data?.completedChart || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey={user.role === "admin" ? "revenue" : "value"} stroke="#2563EB" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-md border border-line bg-white p-4">
          <h2 className="mb-4 font-semibold">Appointment Status</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data?.appointmentStatus || data?.completedChart || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#B88900" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <DataTable
          columns={[
            { key: "customer", label: "Customer", render: (row) => row.customerId?.name || "-" },
            { key: "date", label: "Date", render: (row) => row.date?.slice(0, 10) },
            { key: "time", label: "Time", render: (row) => `${row.startTime} - ${row.endTime}` },
            { key: "status", label: "Status", render: (row) => <Status value={row.status} /> }
          ]}
          rows={data?.appointments || []}
        />
      </div>
    </>
  );
}
