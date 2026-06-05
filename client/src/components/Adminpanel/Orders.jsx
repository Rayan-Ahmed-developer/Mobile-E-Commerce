// pages/Orders.jsx
import { useState ,useEffect} from "react";
import axios from "axios";

const initialOrders = [
  { id: "#101", customer: "Ahmed Raza",    car: "Toyota Corolla 2022", amount: "Rs 42,00,000", status: "delivered"  },
  { id: "#102", customer: "Sara Khan",     car: "Honda Civic 2023",    amount: "Rs 55,00,000", status: "pending"    },
  { id: "#103", customer: "Bilal Mehmood", car: "Suzuki Alto 2023",    amount: "Rs 18,00,000", status: "processing" },
  { id: "#104", customer: "Zara Ali",      car: "KIA Sportage 2023",   amount: "Rs 72,00,000", status: "cancelled"  },
  { id: "#105", customer: "Hassan Tariq",  car: "Hyundai Tucson 2022", amount: "Rs 68,00,000", status: "pending"    },
  { id: "#106", customer: "Nida Farooq",   car: "Toyota Yaris 2022",   amount: "Rs 32,00,000", status: "processing" },
  { id: "#107", customer: "Umar Sheikh",   car: "Honda BRV 2023",      amount: "Rs 48,00,000", status: "delivered"  },
  { id: "#108", customer: "Maria Siddiq",  car: "Suzuki Cultus 2023",  amount: "Rs 22,00,000", status: "pending"    },
];

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

  // Filter + Search
const filtered = orders.filter((o) => {

  const matchFilter =
    filter === "all" || o.status === filter;

  const matchSearch =
    o?._id?.toLowerCase().includes(search.toLowerCase()) ||
    o?.phoneNo?.toString().includes(search);

  return matchFilter && matchSearch;

});

  // Update status
  let token = localStorage.getItem("token")
  function updateStatus(id, newStatus) {
    axios.put(`https://mobile-e-commerce-production.up.railway.app/api/auth/update-order-status/${id}`, { status: newStatus },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    )
      .then(res => {
        console.log(res.data);
        setOrders(prev => prev.map(o => o._id === id ? { ...o, status: newStatus } : o));
      })
      .catch(err => {
        console.error(err);
      });
  }

  
  useEffect(() => {
     axios.get("https://mobile-e-commerce-production.up.railway.app/api/auth/view-orders",{
      headers: {
        Authorization: `Bearer ${token}`
      }
     })
    .then((res)=>{
      setOrders(res.data.orders || [])
      console.log(res.data.orders)
    })
    .catch((err)=>{
      console.log(err)
    })
  }, [])
  

  return (
    <div className="space-y-5">

      {/* Title */}
      <h2 className="text-xl font-semibold text-gray-800">Orders</h2>

      {/* Filter Tabs */}
      <div className="flex gap-2 flex-wrap">
        {statusOptions.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`text-xs px-3 py-1.5 rounded-full border font-medium capitalize transition-colors
              ${filter === s
                ? "bg-gray-900 text-white border-gray-900"
                : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"}`}
          >
            {s} {s !== "all" && `(${orders.filter(o => o.status === s).length})`}
          </button>
        ))}
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by customer or order ID..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-full sm:w-72 outline-none focus:border-gray-400"
      />

      {/* Count */}
      <p className="text-sm text-gray-400">{filtered.length} orders</p>

      {/* Mobile: Cards */}
      <div className="flex flex-col gap-3 md:hidden">
        {filtered.map((o) => (
          <div key={o._id} className="bg-white rounded-xl border border-gray-200 p-4 space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-gray-800">{o.email}</p>
                <p className="text-xs text-gray-400">{o._id}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${badgeColor[o.status]}`}>
                {o.status}
              </span>
            </div>
            <p className="text-xs text-gray-500">🚗 {o.model}</p>
            <p className="text-sm font-semibold text-gray-800">{o.price}</p>

            {/* Status Update */}
            <select
              value={o.status}
              onChange={(e) => updateStatus(o._id, e.target.value)}
              className="w-full text-xs border border-gray-200 rounded-lg px-2 py-1.5 outline-none"
            >
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        ))}
      </div>

      {/* Desktop: Table */}
      <div className="hidden md:block bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr className="text-left text-gray-400">
              <th className="px-4 py-3 font-medium">Order ID</th>
              <th className="px-4 py-3 font-medium">Customer</th>
              <th className="px-4 py-3 font-medium">Payment Method</th>
              <th className="px-4 py-3 font-medium">Amount</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Update</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((o) => (
              <tr key={o._id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-400 font-mono">{o._id}</td>
                <td className="px-4 py-3 font-medium text-gray-800">{o.userName}</td>
                <td className="px-4 py-3 text-gray-500">{o.paymentMethod}</td>
                <td className="px-4 py-3 font-semibold text-gray-800">{o.totalAmount}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${badgeColor[o.status]}`}>
                    {o.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <select
                    value={o.status}
                    onChange={(e) => updateStatus(o._id, e.target.value)}
                    className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 outline-none hover:border-gray-400 cursor-pointer"
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

        {filtered.length === 0 && (
          <div className="text-center py-10 text-gray-400 text-sm">
            No orders found matching "{search}"
          </div>
        )}
      </div>

    </div>
  );
}