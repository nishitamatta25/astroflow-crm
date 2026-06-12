import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";
import Appointments from "./pages/Appointments";
import Astrologers from "./pages/Astrologers";
import Availability from "./pages/Availability";
import Consultations from "./pages/Consultations";
import Customers from "./pages/Customers";
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import Login from "./pages/Login";
import Payments from "./pages/Payments";
import Reports from "./pages/Reports";

export default function App() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="astrologers" element={<ProtectedRoute roles={["admin"]}><Astrologers /></ProtectedRoute>} />
        <Route path="leads" element={<ProtectedRoute roles={["admin"]}><Leads /></ProtectedRoute>} />
        <Route path="customers" element={<Customers />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="availability" element={<Availability />} />
        <Route path="consultations" element={<Consultations />} />
        <Route path="payments" element={<ProtectedRoute roles={["admin"]}><Payments /></ProtectedRoute>} />
        <Route path="reports" element={<Reports />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
