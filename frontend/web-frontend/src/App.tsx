import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import EmployeeList from "./services/employee/EmployeeList";
import DepartmentList from "./services/department/DepartmentList";
import PayrollList from "./services/payroll/PayrollList";
import { Users, Building2, Wallet } from "lucide-react";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
        {/* Top Navigation Bar */}
        <nav className="w-full bg-gradient-to-r from-slate-800 to-slate-900 border-b border-slate-700 shadow-xl">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">HR System</h1>
                <p className="text-xs text-slate-400">Management Suite</p>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="flex gap-4">
              <NavLink
                to="/employees"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/50"
                      : "text-slate-300 hover:bg-slate-700/50 hover:text-white"
                  }`
                }
              >
                <Users className="w-5 h-5" />
                Employees
              </NavLink>

              <NavLink
                to="/departments"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-lg shadow-purple-500/50"
                      : "text-slate-300 hover:bg-slate-700/50 hover:text-white"
                  }`
                }
              >
                <Building2 className="w-5 h-5" />
                Departments
              </NavLink>

              <NavLink
                to="/payrolls"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-lg shadow-emerald-500/50"
                      : "text-slate-300 hover:bg-slate-700/50 hover:text-white"
                  }`
                }
              >
                <Wallet className="w-5 h-5" />
                Payrolls
              </NavLink>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-auto mt-4">
          <div className="max-w-7xl mx-auto">
            <Routes>
              <Route path="/employees" element={<EmployeeList />} />
              <Route path="/departments" element={<DepartmentList />} />
              <Route path="/payrolls" element={<PayrollList />} />
              <Route path="*" element={<EmployeeList />} />
            </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}
