import { useState ,useEffect} from "react";
import axios from "axios";

const statusOptions = ["all", "pending", "processing", "delivered", "cancelled"];

const badgeColor = {
  pending:    "bg-yellow-100 text-yellow-700",
  delivered:  "bg-green-100  text-green-700",
  processing: "bg-blue-100   text-blue-700",
  cancelled:  "bg-red-100    text-red-700",
};

export default function Orders() {
  const [orders, setOrders]       = useState([]);
  const [filter, setFilter]       = useState("all");
  const [search, setSearch]       = useState("");

  const filtered = orders.filter((o) => {

    const matchFilter =
      filter === "all" || o.status === filter;

    const matchSearch =
      o?._id?.toLowerCase().includes(search.toLowerCase()) ||
      o?.email?.toLowerCase().includes(search.toLowerCase()) ||
      o?.userName?.toLowerCase().includes(search.toLowerCase());

    return matchFilter && matchSearch;
  });

  let token = localStorage.getItem("token")

  function updateStatus(id, newStatus) {
    axios.put(
      `https://mobile-e-commerce-production-e6b9.up.railway.app/api/auth/update-order-status/${id}`,
      { status: newStatus },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then(res => {
      setOrders(prev =>
        prev.map(o =>
          o._id === id ? { ...o, status: newStatus } : o
        )
      );
    })
    .catch(err => console.error(err));
  }

  useEffect(() => {
    axios.get(
      "https://mobile-e-commerce-production-e6b9.up.railway.app/api/auth/view-orders",
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then((res)=>{
      setOrders(res.data.orders || [])
    })
    .catch((err)=>{
      console.log(err)
    })
  }, [])

  return (
    <div className="space-y-5">

      <h2 className="text-xl font-semibold text-gray-800">Orders</h2>

      <div className="flex gap-2 flex-wrap">
        {statusOptions.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`text-xs px-3 py-1.5 rounded-full border font-medium capitalize
              ${filter === s
                ? "bg-gray-900 text-white border-gray-900"
                : "bg-white text-gray-500 border-gray-200"}`}
          >
            {s}
          </button>
        ))}
      </div>

      <input
        type="text"
        placeholder="Search by customer or order ID..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-full sm:w-72"
      />

      <p className="text-sm text-gray-400">{filtered.length} orders</p>

      {/* MOBILE (ONLY DATA FIX) */}
      <div className="flex flex-col gap-3 md:hidden">
        {filtered.map((o) => (
          <div key={o._id} className="bg-white rounded-xl border border-gray-200 p-4 space-y-2">

            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-gray-800">{o.userName}</p>
                <p className="text-xs text-gray-400">{o._id}</p>
              </div>

              <span className={`text-xs px-2 py-1 rounded-full font-medium ${badgeColor[o.status]}`}>
                {o.status}
              </span>
            </div>
            <p className="text-xs text-gray-500">{o.paymentMethod}</p>
            <p className="text-sm font-semibold text-gray-800">{o.totalAmount}</p>

            <select
              value={o.status}
              onChange={(e) => updateStatus(o._id, e.target.value)}
              className="w-full text-xs border border-gray-200 rounded-lg px-2 py-1.5"
            >
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>

          </div>
        ))}
      </div>

      {/* DESKTOP (ONLY DATA FIX) */}
      <div className="hidden md:block bg-white rounded-xl border border-gray-200 overflow-hidden">

        <table className="w-full text-sm">

          <thead className="bg-gray-50">
            <tr className="text-left text-gray-400">
              <th className="px-4 py-3">Order ID</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Payment Method</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Update</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((o) => (
              <tr key={o._id} className="border-b border-gray-50">

                <td className="px-4 py-3 text-gray-400">{o._id}</td>
                <td className="px-4 py-3">{o.userName}</td>
                <td className="px-4 py-3">{o.paymentMethod}</td>
                <td className="px-4 py-3">{o.totalAmount}</td>

                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-1 rounded-full ${badgeColor[o.status]}`}>
                    {o.status}
                  </span>
                </td>

                <td className="px-4 py-3">
                  <select
                    value={o.status}
                    onChange={(e) => updateStatus(o._id, e.target.value)}
                    className="text-xs border rounded px-2 py-1"
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
}