import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { PageHeader } from "../components/UI";
import { useAuth } from "../context/AuthContext";
import { api } from "../services/api";

export default function Reports() {
  const { user } = useAuth();
  const [appointmentReport, setAppointmentReport] = useState(null);
  const [revenueReport, setRevenueReport] = useState(null);

  useEffect(() => {
    api("/reports/appointments").then(setAppointmentReport).catch(console.error);
    if (user.role === "admin") api("/reports/revenue").then(setRevenueReport).catch(console.error);
  }, [user.role]);

  return (
    <>
      <PageHeader title="Reports" subtitle="Revenue, appointments, leads, customers, and payments" />
      <div className="grid gap-5 xl:grid-cols-2">
        <div className="rounded-md border border-line bg-white p-4">
          <h2 className="mb-4 font-semibold">Appointment Status</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={appointmentReport?.byStatus || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#2563EB" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        {user.role === "admin" && (
          <div className="rounded-md border border-line bg-white p-4">
            <h2 className="mb-4 font-semibold">Revenue by Payment Method</h2>
            <p className="mb-4 text-sm text-slate-500">Total revenue: INR {revenueReport?.totalRevenue || 0}</p>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueReport?.byMethod || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#B88900" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
