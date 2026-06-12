import { Bell, CalendarDays, ClipboardList, CreditCard, FileText, LayoutDashboard, LogOut, Menu, Moon, NotebookPen, Search, Settings, Users, UserRoundCog } from "lucide-react";
import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const adminNav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/astrologers", label: "Astrologers", icon: UserRoundCog },
  { to: "/leads", label: "Leads", icon: ClipboardList },
  { to: "/customers", label: "Customers", icon: Users },
  { to: "/appointments", label: "Appointments", icon: CalendarDays },
  { to: "/availability", label: "Availability", icon: Settings },
  { to: "/consultations", label: "Consultations", icon: NotebookPen },
  { to: "/payments", label: "Payments", icon: CreditCard },
  { to: "/reports", label: "Reports", icon: FileText }
];

const astrologerNav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/customers", label: "Customers", icon: Users },
  { to: "/appointments", label: "Appointments", icon: CalendarDays },
  { to: "/availability", label: "Availability", icon: Settings },
  { to: "/consultations", label: "Consultations", icon: NotebookPen },
  { to: "/reports", label: "Reports", icon: FileText }
];

export default function Layout() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const nav = user.role === "admin" ? adminNav : astrologerNav;

  return (
    <div className="min-h-screen bg-[#f6f7fb]">
      <aside className={`fixed inset-y-0 left-0 z-20 w-64 border-r border-line bg-white transition-transform lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-16 items-center border-b border-line px-5">
          <div>
            <p className="text-sm font-semibold text-brand">Astrologer CRM</p>
            <p className="text-xs text-slate-500">Consultation operations</p>
          </div>
        </div>
        <nav className="space-y-1 p-3">
          {nav.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${isActive ? "bg-blue-50 text-brand" : "text-slate-600 hover:bg-slate-50"}`
                }
              >
                <Icon size={18} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-line bg-white px-4 lg:px-6">
          <div className="flex items-center gap-3">
            <button className="rounded-md border border-line p-2 lg:hidden" onClick={() => setOpen(true)} title="Open menu">
              <Menu size={18} />
            </button>
            <div className="hidden items-center gap-2 rounded-md border border-line bg-slate-50 px-3 py-2 md:flex">
              <Search size={16} className="text-slate-400" />
              <input className="w-72 bg-transparent text-sm outline-none" placeholder="Search CRM records" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="rounded-md border border-line p-2" title="Notifications">
              <Bell size={18} />
            </button>
            <button className="rounded-md border border-line p-2" title="Dark mode">
              <Moon size={18} />
            </button>
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold">{user.name}</p>
              <p className="text-xs capitalize text-slate-500">{user.role}</p>
            </div>
            <button className="rounded-md border border-line p-2 text-rose-600" onClick={logout} title="Logout">
              <LogOut size={18} />
            </button>
          </div>
        </header>
        <main className="p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
