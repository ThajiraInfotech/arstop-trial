import React, { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { getOrders } from "../data/mock";
import { Package, Clock, CheckCircle, Truck, ArrowUpDown, Filter, RefreshCw } from "lucide-react";

const statusIcon = (status) => {
  switch (status) {
    case "processing":
      return <Clock className="h-4 w-4" />;
    case "shipped":
      return <Truck className="h-4 w-4" />;
    case "delivered":
      return <CheckCircle className="h-4 w-4" />;
    default:
      return <Package className="h-4 w-4" />;
  }
};

const statusColor = (status) => {
  switch (status) {
    case "processing":
      return "bg-yellow-100 text-yellow-800";
    case "shipped":
      return "bg-blue-100 text-blue-800";
    case "delivered":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [sortMode, setSortMode] = useState("new"); // "new" | "old"
  const [statusFilter, setStatusFilter] = useState("all"); // all | processing | shipped | delivered
  const [search, setSearch] = useState("");

  useEffect(() => {
    setOrders(getOrders());
  }, []);

  const refresh = () => {
    try {
      setOrders(getOrders());
    } catch {
      // ignore
    }
  };

  const filtered = useMemo(() => {
    let list = Array.isArray(orders) ? [...orders] : [];
    if (statusFilter !== "all") {
      list = list.filter((o) => o.status === statusFilter);
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter((o) => {
        const idMatch = String(o.id).toLowerCase().includes(q);
        const itemsMatch = (o.items || []).some((it) => it.name.toLowerCase().includes(q));
        return idMatch || itemsMatch;
      });
    }
    list.sort((a, b) => {
      const da = new Date(a.date).getTime();
      const db = new Date(b.date).getTime();
      return sortMode === "new" ? db - da : da - db;
    });
    return list;
  }, [orders, sortMode, statusFilter, search]);

  const stats = useMemo(() => {
    const total = filtered.reduce((acc, o) => acc + (o.total || 0), 0);
    const byStatus = filtered.reduce(
      (acc, o) => {
        acc[o.status] = (acc[o.status] || 0) + 1;
        return acc;
      },
      { processing: 0, shipped: 0, delivered: 0 }
    );
    return { count: filtered.length, total, byStatus };
  }, [filtered]);

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
              <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
              <p className="text-gray-600">View and manage recent and older orders</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <input
                placeholder="Search by order # or item"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-64 border-gray-300 rounded-md pl-10 pr-3 py-2"
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
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="text-sm text-gray-500">Orders</div>
              <div className="text-2xl font-semibold text-gray-900">{stats.count}</div>
            </CardContent>
          </Card>
          <Card className="bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="text-sm text-gray-500">Processing</div>
              <div className="text-2xl font-semibold text-gray-900">{stats.byStatus.processing || 0}</div>
            </CardContent>
          </Card>
          <Card className="bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="text-sm text-gray-500">Shipped</div>
              <div className="text-2xl font-semibold text-gray-900">{stats.byStatus.shipped || 0}</div>
            </CardContent>
          </Card>
          <Card className="bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="text-sm text-gray-500">Revenue (₹)</div>
              <div className="text-2xl font-semibold text-gray-900">
                ₹{(stats.total || 0).toLocaleString()}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <Card className="bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 border border-gray-200 rounded-lg shadow-sm mb-6">
          <CardContent className="p-4 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant={sortMode === "new" ? "default" : "outline"}
                className={sortMode === "new" ? "bg-indigo-600 hover:bg-indigo-700" : "border-gray-300"}
                onClick={() => setSortMode("new")}
              >
                <ArrowUpDown className="h-4 w-4 mr-2" />
                Newest First
              </Button>
              <Button
                variant={sortMode === "old" ? "default" : "outline"}
                className={sortMode === "old" ? "bg-indigo-600 hover:bg-indigo-700" : "border-gray-300"}
                onClick={() => setSortMode("old")}
              >
                <ArrowUpDown className="h-4 w-4 mr-2" />
                Oldest First
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 hidden sm:inline">Status</span>
              <div className="relative">
                <Filter className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="pl-9 pr-8 py-2 border-gray-300 rounded-md"
                >
                  <option value="all">All</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Orders List */}
        <div className="space-y-4">
          {filtered.map((order) => (
            <Card key={order.id} className="bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 mb-4 pb-3 border-b">
                  <div className="flex items-center gap-3">
                    <div className="bg-indigo-50 p-2 rounded-lg">
                      <Package className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Order</div>
                      <div className="text-lg font-semibold text-gray-900">#{order.id}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={`${statusColor(order.status)} flex items-center gap-1`}>
                      {statusIcon(order.status)}
                      <span className="capitalize font-medium">{order.status}</span>
                    </Badge>
                    <div className="text-right">
                      <div className="text-xs text-gray-500">Date</div>
                      <div className="text-sm font-medium text-gray-900">
                        {new Date(order.date).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-500">Total</div>
                      <div className="text-lg font-bold text-gray-900">
                        ₹{(order.total || 0).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Items */}
                <div className="grid gap-3">
                  {(order.items || []).map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="w-14 h-14 rounded overflow-hidden bg-white">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900 truncate">
                          {item.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          Qty: {item.quantity}
                        </div>
                      </div>
                      <div className="text-sm font-semibold text-gray-900">
                        ₹{((item.price || 0) * (item.quantity || 1)).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}

          {!filtered.length && (
            <Card className="bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 border border-gray-200 rounded-lg shadow-sm">
              <CardContent className="p-8 text-center text-gray-600">
                No orders found with current filters.
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;