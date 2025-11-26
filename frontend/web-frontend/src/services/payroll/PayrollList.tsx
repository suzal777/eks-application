import { useEffect, useState } from "react";
import { getPayrolls, deletePayroll } from "./api";
import PayrollForm from "./PayrollForm";
import { Edit2, Trash2, Plus } from "lucide-react";
import type { Payroll } from "./types";

export default function PayrollList() {
  const [payrolls, setPayrolls] = useState<Payroll[]>([]);
  const [editing, setEditing] = useState<Payroll | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchPayrolls = async () => {
    setLoading(true);
    setPayrolls(await getPayrolls());
    setLoading(false);
  };

  useEffect(() => {
    fetchPayrolls();
  }, []);

  const handleDelete = async (id: number | string) => {
    if (window.confirm("Are you sure you want to delete this payroll record?")) {
      await deletePayroll(id);
      fetchPayrolls();
    }
  };

  const totalSalary = payrolls.reduce((sum, p) => sum + (parseFloat(p.salary) || 0), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Payrolls</h1>
          <p className="text-slate-400">Track and manage salary payments</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4 text-right">
            <p className="text-2xl font-bold text-emerald-400">{payrolls.length}</p>
            <p className="text-slate-400 text-sm">Records</p>
          </div>
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 text-right">
            <p className="text-2xl font-bold text-blue-400">${totalSalary.toFixed(2)}</p>
            <p className="text-slate-400 text-sm">Total Salary</p>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6 shadow-xl">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Plus className="w-5 h-5 text-emerald-400" />
          {editing ? "Edit Payroll" : "Add New Payroll"}
        </h2>
        <PayrollForm onSuccess={fetchPayrolls} editing={editing} setEditing={setEditing} />
      </div>

      {/* Table Section */}
      <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl overflow-hidden shadow-xl">
        {loading ? (
          <div className="p-8 text-center text-slate-400">Loading payrolls...</div>
        ) : payrolls.length === 0 ? (
          <div className="p-8 text-center text-slate-400">No payroll records found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-700/50 border-b border-slate-600">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">ID</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Employee ID</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Salary</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Month</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {payrolls.map((p) => (
                  <tr
                    key={p.id}
                    className="hover:bg-slate-700/30 transition-colors duration-200"
                  >
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-slate-700 text-slate-300 rounded-lg text-sm font-medium">
                        #{p.id}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-slate-700/50 text-slate-300 rounded text-sm">
                        EMP-{p.employeeId}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-emerald-400 font-semibold">
                        ${parseFloat(p.salary).toFixed(2)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-300">{p.month}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditing(p)}
                          className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white rounded-lg transition-all duration-200 shadow-lg hover:shadow-emerald-500/50"
                        >
                          <Edit2 className="w-4 h-4" />
                          <span className="text-sm font-medium">Edit</span>
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white rounded-lg transition-all duration-200 shadow-lg hover:shadow-red-500/50"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span className="text-sm font-medium">Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}