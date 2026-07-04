
// pages/Products.jsx
import { useState, useEffect } from "react";
import axios from "axios";

const emptyForm = {
  model: "",
  brand: "",
  price: "",
  title: "",
  description: "",
  image: "",
  ram: "",
  rom: "",
};

export default function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://mobile-e-commerce-production-e6b9.up.railway.app//api/ecommerce/phone-list")
      .then((res) => {
        setProducts(res.data.phones || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = products.filter(
    (p) =>
      p.model?.toLowerCase().includes(search.toLowerCase()) ||
      p.brand?.toLowerCase().includes(search.toLowerCase()) ||
      p.title?.toLowerCase().includes(search.toLowerCase())
  );

  function validate() {
    const e = {};
    if (!form.model.trim()) e.model = "Model is required";
    if (!form.brand.trim()) e.brand = "Brand is required";
    if (!form.title.trim()) e.title = "Title is required";
    if (!form.price) e.price = "Price is required";
    if (!form.description.trim()) e.description = "Description is required";
    return e;
  }

  function openAdd() {
    setForm(emptyForm);
    setEditId(null);
    setErrors({});
    setShowModal(true);
  }

  function openEdit(p) {
    setForm({
      model: p.model || "",
      brand: p.brand || "",
      price: p.price || "",
      title: p.title || "",
      description: p.description || "",
      image: p.image || "",
      ram: p.ram || "",
      rom: p.rom || "",
    });
    setEditId(p._id);
    setErrors({});
    setShowModal(true);
  }

  function handleSave() {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }

    const payload = {
      ...form,
      price: Number(form.price),
    };

    if (editId) {
      axios
        .put(`https://mobile-e-commerce-production-e6b9.up.railway.app//api/ecommerce/update-one/${editId}`, payload)
        .then(() => {
          setProducts((prev) =>
            prev.map((p) => (p._id === editId ? { ...p, ...payload } : p))
          );
          setShowModal(false);
          setEditId(null);
          setForm(emptyForm);
        })
        .catch((err) => console.error(err));
    } else {
      axios
        .post("https://mobile-e-commerce-production-e6b9.up.railway.app//api/ecommerce/add-one", payload)
        .then((res) => {
          setProducts([...products, res.data.phone]);
          setShowModal(false);
          setForm(emptyForm);
        })
        .catch((err) => console.error(err));
    }
  }

  function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this product?")) {
      axios
        .delete(`https://mobile-e-commerce-production-e6b9.up.railway.app//api/ecommerce/delete-one/${id}`)
        .then(() => setProducts(products.filter((p) => p._id !== id)))
        .catch((err) => console.error(err));
    }
  }

  function toggleStatus(id) {
    axios
      .put(`https://mobile-e-commerce-production-e6b9.up.railway.app//api/ecommerce/toggle-status/${id}`)
      .then((res) => {
        const newStatus = res.data.newStatus;
        setProducts(
          products.map((p) => (p._id === id ? { ...p, status: newStatus } : p))
        );
      })
      .catch((err) => console.error(err));
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 md:px-10">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-sm text-gray-400 mt-0.5">{products.length} total products</p>
        </div>
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 bg-gray-900 text-white text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-gray-700 transition-all"
        >
          <span className="text-lg leading-none">+</span> Add Product
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Total", value: products.length, color: "text-blue-700" },
          { label: "Active", value: products.filter((p) => p.status === "active").length, color: "text-green-700" },
          { label: "Inactive", value: products.filter((p) => p.status !== "active").length, color: "text-red-600" },
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
          placeholder="Search by model, brand or title..."
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
          <p className="text-center text-gray-400 text-sm py-10">No products found</p>
        ) : (
          filtered.map((p) => (
            <div key={p._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 space-y-3">
              <div className="flex gap-3 items-start">
                {p.image ? (
                  <img
                    src={p.image}
                    alt={p.model}
                    className="w-14 h-14 rounded-xl object-contain bg-gray-50 border border-gray-100 p-0.5 shrink-0"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center text-gray-300 text-2xl shrink-0">📦</div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <p className="font-semibold text-gray-800 text-sm truncate">{p.title || p.model}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ml-2 shrink-0 ${p.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                      {p.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400">{p.brand} — {p.model}</p>
                  <p className="text-sm font-bold text-gray-800 mt-1">Rs {Number(p.price)?.toLocaleString()}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-center">
                <div className="bg-gray-50 rounded-lg py-1.5">
                  <p className="text-gray-400">RAM</p>
                  <p className="font-semibold text-gray-700">{p.ram || "—"}</p>
                </div>
                <div className="bg-gray-50 rounded-lg py-1.5">
                  <p className="text-gray-400">ROM</p>
                  <p className="font-semibold text-gray-700">{p.rom || "—"}</p>
                </div>
              </div>

              <div className="flex gap-2 pt-1">
                <button onClick={() => openEdit(p)} className="flex-1 text-xs border border-gray-200 rounded-xl py-2 hover:bg-gray-50 text-gray-600 font-medium">Edit</button>
                <button onClick={() => toggleStatus(p._id)} className="flex-1 text-xs border border-gray-200 rounded-xl py-2 hover:bg-gray-50 text-gray-600 font-medium">
                  {p.status === "active" ? "Deactivate" : "Activate"}
                </button>
                <button onClick={() => handleDelete(p._id)} className="flex-1 text-xs bg-red-50 text-red-600 border border-red-100 rounded-xl py-2 hover:bg-red-100 font-medium">Delete</button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-2xl border border-gray-100 shadow-sm overflow-x-auto">
        <table className="w-full min-w-[860px] text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-left text-gray-400 text-xs uppercase tracking-wider">
              <th className="px-5 py-4 font-medium">Product</th>
              <th className="px-5 py-4 font-medium">Brand / Model</th>
              <th className="px-5 py-4 font-medium">Price</th>
              <th className="px-5 py-4 font-medium">RAM / ROM</th>
              <th className="px-5 py-4 font-medium">Status</th>
              <th className="px-5 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="text-center py-16 text-gray-400">Loading products...</td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-16 text-gray-400">No products found</td>
              </tr>
            ) : (
              filtered.map((p) => (
                <tr key={p._id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      {p.image ? (
                        <img
                          src={p.image}
                          alt={p.model}
                          className="w-12 h-12 rounded-xl object-contain bg-gray-50 border border-gray-100 p-0.5 shrink-0"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-gray-300 text-xl shrink-0">📦</div>
                      )}
                      <div className="min-w-0">
                        <p className="font-semibold text-gray-800">{p.title || p.model}</p>
                        <p className="text-xs text-gray-400 mt-0.5 max-w-[180px] truncate">{p.description || "—"}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <p className="font-medium text-gray-700">{p.brand}</p>
                    <p className="text-xs text-gray-400">{p.model}</p>
                  </td>

                  <td className="px-5 py-4 font-bold text-gray-800 whitespace-nowrap">
                    Rs {Number(p.price)?.toLocaleString()}
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex flex-col gap-1">
                      {p.ram && <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full w-fit">{p.ram} RAM</span>}
                      {p.rom && <span className="text-xs bg-purple-50 text-purple-600 px-2 py-0.5 rounded-full w-fit">{p.rom} ROM</span>}
                      {!p.ram && !p.rom && <span className="text-gray-300">—</span>}
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium whitespace-nowrap ${p.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                      {p.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => openEdit(p)}
                        className="text-xs border border-gray-200 rounded-xl px-3 py-1.5 hover:bg-gray-100 text-gray-600 font-medium transition-colors whitespace-nowrap"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => toggleStatus(p._id)}
                        className="text-xs border border-gray-200 rounded-xl px-3 py-1.5 hover:bg-gray-100 text-gray-600 font-medium transition-colors whitespace-nowrap"
                      >
                        {p.status === "active" ? "Deactivate" : "Activate"}
                      </button>
                      <button
                        onClick={() => handleDelete(p._id)}
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden">

            <div className="flex justify-between items-center px-6 py-5 border-b border-gray-100">
              <h3 className="text-base font-bold text-gray-800">
                {editId ? "✏️ Edit Product" : "➕ Add New Product"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 text-sm transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="px-6 py-5 space-y-4 max-h-[70vh] overflow-y-auto">

              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1 block">Title *</label>
                <input
                  type="text"
                  placeholder="e.g. Samsung Galaxy S24 Ultra"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition-all"
                />
                {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-500 mb-1 block">Brand *</label>
                  <input
                    type="text"
                    placeholder="e.g. Samsung"
                    value={form.brand}
                    onChange={(e) => setForm({ ...form, brand: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition-all"
                  />
                  {errors.brand && <p className="text-xs text-red-500 mt-1">{errors.brand}</p>}
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 mb-1 block">Model *</label>
                  <input
                    type="text"
                    placeholder="e.g. S24 Ultra"
                    value={form.model}
                    onChange={(e) => setForm({ ...form, model: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition-all"
                  />
                  {errors.model && <p className="text-xs text-red-500 mt-1">{errors.model}</p>}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1 block">Price (Rs) *</label>
                <input
                  type="number"
                  placeholder="e.g. 280000"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition-all"
                />
                {errors.price && <p className="text-xs text-red-500 mt-1">{errors.price}</p>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-500 mb-1 block">RAM</label>
                  <input
                    type="text"
                    placeholder="e.g. 12GB"
                    value={form.ram}
                    onChange={(e) => setForm({ ...form, ram: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 mb-1 block">ROM</label>
                  <input
                    type="text"
                    placeholder="e.g. 256GB"
                    value={form.rom}
                    onChange={(e) => setForm({ ...form, rom: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1 block">Image URL</label>
                <input
                  type="text"
                  placeholder="https://example.com/image.jpg"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition-all"
                />
                {form.image && (
                  <img
                    src={form.image}
                    alt="preview"
                    className="mt-2 h-16 w-16 object-contain rounded-xl border border-gray-100 bg-gray-50 p-1"
                    onError={(e) => (e.target.style.display = "none")}
                  />
                )}
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1 block">Description *</label>
                <textarea
                  rows={3}
                  placeholder="Short product description..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition-all resize-none"
                />
                {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description}</p>}
              </div>

            </div>

            <div className="flex gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 border border-gray-200 bg-white rounded-xl py-2.5 text-sm text-gray-600 hover:bg-gray-100 font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex-1 bg-gray-900 text-white rounded-xl py-2.5 text-sm font-semibold hover:bg-gray-700 transition-all"
              >
                {editId ? "Save Changes" : "Add Product"}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}