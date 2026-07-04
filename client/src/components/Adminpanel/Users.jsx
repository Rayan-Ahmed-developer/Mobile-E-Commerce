// pages/Users.jsx
import { useEffect, useState } from "react";
import axios from "axios";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  

  const fetchUsers = async () => {
    try {
      const res = await axios.get("https://mobile-e-commerce-production-e6b9.up.railway.app//api/auth/view-users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filtered = users.filter((u) =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
  );

  const removeUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`https://mobile-e-commerce-production-e6b9.up.railway.app//api/auth/delete-user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.filter((u) => u._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const toggleStatus = async (user) => {
    // schema default "Active" capital hai isliye dono handle kar rahe hain
    const isActive = user.status === "Active" || user.status === "active";
    const newStatus = isActive ? "blocked" : "Active";
    try {
      await axios.put(
        `https://mobile-e-commerce-production-e6b9.up.railway.app//api/auth/update-user-status/${user._id}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers(users.map((u) => u._id === user._id ? { ...u, status: newStatus } : u));
    } catch (err) {
      console.error(err);
    }
  };

  // active check helper
  const isActive = (status) => status === "Active" || status === "active";

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 md:px-10">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Users</h1>
          <p className="text-sm text-gray-400 mt-0.5">{users.length} total users</p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Total", value: users.length, color: "text-blue-700" },
          { label: "Active", value: users.filter((u) => isActive(u.status)).length, color: "text-green-700" },
          { label: "Blocked", value: users.filter((u) => !isActive(u.status)).length, color: "text-red-600" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-4 text-center shadow-sm">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-gray-400 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-80 border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-sm outline-none focus:border-gray-400 bg-white shadow-sm"
        />
      </div>

      {/* Mobile Cards */}
      <div className="flex flex-col gap-4 md:hidden">
        {loading ? (
          <p className="text-center text-gray-400 text-sm py-10">Loading...</p>
        ) : filtered.length === 0 ? (
          <p className="text-center text-gray-400 text-sm py-10">No users found</p>
        ) : (
          filtered.map((u) => (
            <div key={u._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-sm shrink-0">
                    {u.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{u.name}</p>
                    <p className="text-xs text-gray-400">{u.email}</p>
                  </div>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${isActive(u.status) ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                  {u.status}
                </span>
              </div>
              <div className="flex gap-2 pt-1">
                <button
                  onClick={() => toggleStatus(u)}
                  className="flex-1 text-xs border border-gray-200 rounded-xl py-2 hover:bg-gray-50 text-gray-600 font-medium"
                >
                  {isActive(u.status) ? "Block" : "Unblock"}
                </button>
                <button
                  onClick={() => removeUser(u._id)}
                  className="flex-1 text-xs bg-red-50 text-red-600 border border-red-100 rounded-xl py-2 hover:bg-red-100 font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-2xl border border-gray-100 shadow-sm overflow-x-auto">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-left text-gray-400 text-xs uppercase tracking-wider">
              <th className="px-5 py-4 font-medium">User</th>
              <th className="px-5 py-4 font-medium">Email</th>
              <th className="px-5 py-4 font-medium">Status</th>
              <th className="px-5 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="text-center py-16 text-gray-400">Loading users...</td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-16 text-gray-400">No users found</td>
              </tr>
            ) : (
              filtered.map((u) => (
                <tr key={u._id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-sm shrink-0">
                        {u.name?.charAt(0).toUpperCase()}
                      </div>
                      <p className="font-semibold text-gray-800">{u.name}</p>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-gray-500">{u.email}</td>

                  <td className="px-5 py-4">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium whitespace-nowrap ${isActive(u.status) ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                      {u.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => toggleStatus(u)}
                        className="text-xs border border-gray-200 rounded-xl px-3 py-1.5 hover:bg-gray-100 text-gray-600 font-medium transition-colors whitespace-nowrap"
                      >
                        {isActive(u.status) ? "Block" : "Unblock"}
                      </button>
                      <button
                        onClick={() => removeUser(u._id)}
                        className="text-xs bg-red-50 text-red-600 border border-red-100 rounded-xl px-3 py-1.5 hover:bg-red-100 font-medium transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}