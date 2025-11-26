import { useEffect, useState } from "react";
import { createPayroll, updatePayroll } from "./api";
import { Save, X, Loader } from "lucide-react";

interface Props {
  editing: any;
  setEditing: (val: any) => void;
  onSuccess: () => void;
}

export default function PayrollForm({ editing, setEditing, onSuccess }: Props) {
  const [employeeId, setEmployeeId] = useState("");
  const [salary, setSalary] = useState("");
  const [month, setMonth] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (editing) {
      setEmployeeId(editing.employeeId);
      setSalary(editing.salary);
      setMonth(editing.month);
      setError("");
    }
  }, [editing]);

  const submit = async (e: any) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (editing) {
        await updatePayroll(editing.id, { employeeId, salary, month });
        setEditing(null);
      } else {
        await createPayroll({ employeeId, salary, month });
      }
      setEmployeeId("");
      setSalary("");
      setMonth("");
      onSuccess();
    } catch (err) {
      setError("Failed to save payroll. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEmployeeId("");
    setSalary("");
    setMonth("");
    setError("");
    setEditing(null);
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Employee ID
          </label>
          <input
            type="number"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            placeholder="Enter employee ID"
            required
            disabled={loading}
            className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Salary
          </label>
          <input
            type="number"
            step="0.01"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            placeholder="Enter salary amount"
            required
            disabled={loading}
            className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Month
          </label>
          <input
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            required
            disabled={loading}
            className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 disabled:from-emerald-600/50 disabled:to-emerald-500/50 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-emerald-500/50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader className="w-4 h-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              {editing ? "Update Payroll" : "Add Payroll"}
            </>
          )}
        </button>

        {editing && (
          <button
            type="button"
            onClick={handleCancel}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-2 bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-white font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <X className="w-4 h-4" />
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}