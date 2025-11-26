import { useEffect, useState } from "react";
import { getDepartments, deleteDepartment } from "./api";
import DepartmentForm from "./DepartmentForm";
import { Edit2, Trash2, Plus } from "lucide-react";
import type { Department } from "./types";

export default function DepartmentList() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [editing, setEditing] = useState<Department | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchDepartments = async () => {
    setLoading(true);
    setDepartments(await getDepartments());
    setLoading(false);
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleDelete = async (id: number | string) => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      await deleteDepartment(id);
      fetchDepartments();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Departments</h1>
          <p className="text-slate-400">Organize and manage departments</p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-purple-400">{departments.length}</p>
          <p className="text-slate-400 text-sm">Total Departments</p>
        </div>
      </div>

      {/* Form Section */}
      <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6 shadow-xl">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Plus className="w-5 h-5 text-purple-400" />
          {editing ? "Edit Department" : "Add New Department"}
        </h2>
        <DepartmentForm onSuccess={fetchDepartments} editing={editing} setEditing={setEditing} />
      </div>

      {/* Table Section */}
      <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl overflow-hidden shadow-xl">
        {loading ? (
          <div className="p-8 text-center text-slate-400">Loading departments...</div>
        ) : departments.length === 0 ? (
          <div className="p-8 text-center text-slate-400">No departments found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-700/50 border-b border-slate-600">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">ID</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Description</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {departments.map((d) => (
                  <tr
                    key={d.id}
                    className="hover:bg-slate-700/30 transition-colors duration-200"
                  >
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-slate-700 text-slate-300 rounded-lg text-sm font-medium">
                        #{d.id}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-white font-medium">{d.name}</td>
                    <td className="px-6 py-4 text-slate-300">{d.description}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditing(d)}
                          className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white rounded-lg transition-all duration-200 shadow-lg hover:shadow-purple-500/50"
                        >
                          <Edit2 className="w-4 h-4" />
                          <span className="text-sm font-medium">Edit</span>
                        </button>
                        <button
                          onClick={() => handleDelete(d.id)}
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