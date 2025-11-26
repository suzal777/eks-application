import { useEffect, useState } from "react";
import { createEmployee, updateEmployee } from "./api";
import { Save, X, Loader } from "lucide-react";

interface Props {
  editing: any;
  setEditing: (val: any) => void;
  onSuccess: () => void;
}

export default function EmployeeForm({ editing, setEditing, onSuccess }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (editing) {
      setName(editing.name);
      setEmail(editing.email);
      setError("");
    }
  }, [editing]);

  const submit = async (e: any) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (editing) {
        await updateEmployee(editing.id, { name, email });
        setEditing(null);
      } else {
        await createEmployee({ name, email });
      }
      setName("");
      setEmail("");
      onSuccess();
    } catch (err) {
      setError("Failed to save employee. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setName("");
    setEmail("");
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Full Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter employee name"
            required
            disabled={loading}
            className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email address"
            required
            disabled={loading}
            className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 disabled:from-blue-600/50 disabled:to-blue-500/50 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-blue-500/50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader className="w-4 h-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              {editing ? "Update Employee" : "Add Employee"}
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