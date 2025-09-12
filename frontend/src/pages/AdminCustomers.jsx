import React, { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

const LS_KEY = "artstop_customers";

const seedCustomers = [
  {
    id: 1,
    name: "Ahmed Hassan",
    email: "ahmed@example.com",
    phone: "+91 90000 11111",
    address: "12, MG Road, Bengaluru, KA",
    joinedAt: "2025-01-15T10:00:00.000Z",
  },
  {
    id: 2,
    name: "Fatima Ali",
    email: "fatima@example.com",
    phone: "+91 98888 22222",
    address: "45, Anna Salai, Chennai, TN",
    joinedAt: "2025-01-10T12:00:00.000Z",
  },
];

function getCustomers() {
  try {
    const stored = localStorage.getItem(LS_KEY);
    return stored ? JSON.parse(stored) : seedCustomers;
  } catch {
    return seedCustomers;
  }
}

function saveCustomers(items) {
  localStorage.setItem(LS_KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent("adminCustomersUpdated"));
}

const nextId = (items) => (items.length ? Math.max(...items.map((i) => i.id || 0)) + 1 : 1);

const AdminCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("new"); // new | old | name

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    setCustomers(getCustomers());
    const handler = () => setCustomers(getCustomers());
    window.addEventListener("adminCustomersUpdated", handler);
    return () => window.removeEventListener("adminCustomersUpdated", handler);
  }, []);

  const refresh = () => {
    setCustomers(getCustomers());
  };

  const filtered = useMemo(() => {
    let list = Array.isArray(customers) ? [...customers] : [];
    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter((c) => {
        return (
          c.name.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q) ||
          (c.phone || "").toLowerCase().includes(q) ||
          (c.address || "").toLowerCase().includes(q)
        );
      });
    }
    list.sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }
      const da = new Date(a.joinedAt).getTime();
      const db = new Date(b.joinedAt).getTime();
      return sortBy === "new" ? db - da : da - db;
    });
    return list;
  }, [customers, search, sortBy]);

  const stats = useMemo(() => {
    const total = customers.length;
    const now = Date.now();
    const THIRTY_D = 30 * 24 * 60 * 60 * 1000;
    const recent = customers.filter((c) => now - new Date(c.joinedAt).getTime() <= THIRTY_D).length;
    return { total, recent30: recent };
  }, [customers]);

  const resetForm = () => {
    setForm({ name: "", email: "", phone: "", address: "" });
  };

  const handleAddCustomer = (e) => {
    e?.preventDefault?.();
    const name = form.name.trim();
    const email = form.email.trim();
    if (!name || !email) {
      alert("Name and email are required.");
      return;
    }
    const newCustomer = {
      id: nextId(customers),
      name,
      email,
      phone: form.phone.trim(),
      address: form.address.trim(),
      joinedAt: new Date().toISOString(),
    };
    const next = [...customers, newCustomer];
    saveCustomers(next);
    setCustomers(next);
    resetForm();
  };

  const handleDelete = (id) => {
    if (!confirm("Delete this customer?")) return;
    const next = customers.filter((c) => c.id !== id);
    saveCustomers(next);
    setCustomers(next);
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <img
              src="/artstoplogo.png"
              alt="ArtStop"
              className="h-8 w-auto object-contain drop-shadow-sm"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
              <p className="text-gray-600">View and manage customer details</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <input
                placeholder="Search name, email, phone..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-72 border-gray-300 rounded-md pl-10 pr-3 py-2"
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <Button variant="outline" className="border-gray-300" onClick={refresh}>
              Refresh
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <Card className="bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="text-sm text-gray-500">Total Customers</div>
              <div className="text-2xl font-semibold text-gray-900">{stats.total}</div>
            </CardContent>
          </Card>
          <Card className="bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="text-sm text-gray-500">Joined Last 30 Days</div>
              <div className="text-2xl font-semibold text-gray-900">{stats.recent30}</div>
            </CardContent>
          </Card>
          <Card className="bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="text-sm text-gray-500">Showing</div>
              <div className="text-2xl font-semibold text-gray-900">{filtered.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <Card className="bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 border border-gray-200 rounded-lg shadow-sm mb-6">
          <CardContent className="p-4 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 hidden sm:inline">Sort by</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="py-2 px-3 border-gray-300 rounded-md"
              >
                <option value="new">Newest</option>
                <option value="old">Oldest</option>
                <option value="name">Name</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Add Customer */}
        <Card className="bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 border border-gray-200 rounded-lg shadow-sm mb-6">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Customer</h3>
            <form onSubmit={handleAddCustomer} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Full name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  placeholder="+91 ..."
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  placeholder="Street, City, State"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                />
              </div>
              <div className="sm:col-span-2 flex gap-3">
                <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700">
                  Add Customer
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="border-gray-300"
                  onClick={resetForm}
                >
                  Reset
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Customers List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filtered.map((c) => (
            <Card key={c.id} className="bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-base font-semibold text-gray-900 truncate">{c.name}</div>
                    <div className="text-sm text-gray-600 truncate">{c.email}</div>
                    {c.phone && (
                      <div className="text-sm text-gray-600 mt-1 truncate">{c.phone}</div>
                    )}
                    {c.address && (
                      <div className="text-sm text-gray-600 mt-1 truncate">{c.address}</div>
                    )}
                    <div className="text-xs text-gray-500 mt-2">
                      Joined: {new Date(c.joinedAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      className="border-gray-300 text-red-600 hover:bg-red-50"
                      onClick={() => handleDelete(c.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {!filtered.length && (
            <Card className="bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 border border-gray-200 rounded-lg shadow-sm">
              <CardContent className="p-8 text-center text-gray-600">
                No customers found with current filters.
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminCustomers;