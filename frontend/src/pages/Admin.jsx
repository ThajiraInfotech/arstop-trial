import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { useToast } from "../hooks/use-toast";
import {
  categories as seedCategories,
  products as seedProducts,
  getCategories,
  saveCategories,
  getProducts,
  saveProducts,
  getOrders,
} from "../data/mock";

function slugify(input) {
  return (input || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function numberOr(value, fallback = 0) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

const nextId = (items) => (items.length ? Math.max(...items.map((i) => i.id || 0)) + 1 : 1);

const Admin = () => {
  const { toast } = useToast();

  // Local catalog (persisted in localStorage via mock helpers)
  const [categoriesData, setCategoriesData] = useState(() => getCategories?.() ?? seedCategories);
  const [productsData, setProductsData] = useState(() => getProducts?.() ?? seedProducts);
  const [orders, setOrders] = useState(() => {
    try {
      return getOrders() || [];
    } catch {
      return [];
    }
  });

  // Refresh from localStorage on catalogUpdated events
  useEffect(() => {
    const handler = () => {
      try {
        setCategoriesData(getCategories());
        setProductsData(getProducts());
        setOrders(getOrders());
      } catch {
        // ignore
      }
    };
    window.addEventListener("catalogUpdated", handler);
    return () => window.removeEventListener("catalogUpdated", handler);
  }, []);

  // Simple Stats
  const stats = useMemo(() => {
    const totalCategories = categoriesData.length;
    const totalCollections = categoriesData.reduce((acc, c) => acc + (c.collections?.length || 0), 0);
    const totalProducts = productsData.length;
    const totalOrders = Array.isArray(orders) ? orders.length : 0;
    return { totalCategories, totalCollections, totalProducts, totalOrders };
  }, [categoriesData, productsData, orders]);

  // Add Product - Simple Form
  const [form, setForm] = useState({
    name: "",
    category: (getCategories?.() ?? seedCategories)?.[0]?.slug || "",
    mode: "existing", // "existing" | "new"
    existingCollection: "",
    newCollectionName: "",
    price: "",
    imageUrl: "",
    inStock: true,
    featured: false,
  });

  // Optional file upload -> Data URL preview
  const [imagePreview, setImagePreview] = useState("");

  const availableCollections = useMemo(() => {
    const cat = categoriesData.find((c) => c.slug === form.category);
    return cat?.collections || [];
  }, [categoriesData, form.category]);

  const resetForm = () => {
    setForm({
      name: "",
      category: (getCategories?.() ?? seedCategories)?.[0]?.slug || "",
      mode: "existing",
      existingCollection: "",
      newCollectionName: "",
      price: "",
      imageUrl: "",
      inStock: true,
      featured: false,
    });
    setImagePreview("");
  };

  const onPickFile = async (file) => {
    if (!file) {
      setImagePreview("");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(String(e.target?.result || ""));
    };
    reader.readAsDataURL(file);
  };

  const effectiveCollectionName = useMemo(() => {
    return form.mode === "new" ? form.newCollectionName.trim() : form.existingCollection;
  }, [form.mode, form.newCollectionName, form.existingCollection]);

  const handleCreateProduct = () => {
    const name = form.name.trim();
    if (!name) {
      toast({ title: "Product name required", description: "Please provide a product name." });
      return;
    }
    if (!form.category) {
      toast({ title: "Category required", description: "Please choose a category." });
      return;
    }

    const collectionName = effectiveCollectionName;
    if (!collectionName) {
      toast({
        title: "Collection required",
        description: form.mode === "new" ? "Enter a new collection name." : "Select an existing collection.",
      });
      return;
    }

    const price = numberOr(form.price, NaN);
    if (!Number.isFinite(price) || price < 0) {
      toast({ title: "Invalid price", description: "Enter a valid non-negative price (₹)." });
      return;
    }

    const primaryImage =
      imagePreview?.trim() ||
      form.imageUrl.trim() ||
      `https://picsum.photos/seed/${encodeURIComponent(slugify(name))}/800/600`;

    // Build product
    const newProduct = {
      id: nextId(productsData),
      name,
      category: form.category,
      collection: collectionName,
      price,
      images: [primaryImage],
      variants: [],
      colors: [],
      description: "",
      features: [],
      inStock: !!form.inStock,
      featured: !!form.featured,
      rating: 4.5,
      reviewCount: 0,
    };

    const nextProducts = [...productsData, newProduct];
    saveProducts(nextProducts);
    setProductsData(nextProducts);

    // If new collection, add it to the selected category
    if (form.mode === "new") {
      const cat = categoriesData.find((c) => c.slug === form.category);
      if (cat && !cat.collections.includes(collectionName)) {
        const updatedCategories = categoriesData.map((c) => {
          if (c.slug !== cat.slug) return c;
          const nextCollections = [...(c.collections || []), collectionName];
          const nextImages = {
            ...(c.collectionImages || {}),
            // Use the product's image as the collection image ("image inside that's the product")
            [collectionName]: primaryImage,
          };
          return { ...c, collections: nextCollections, collectionImages: nextImages };
        });
        saveCategories(updatedCategories);
        setCategoriesData(updatedCategories);
      }
    }

    toast({ title: "Product added", description: `${newProduct.name} has been created.` });
    resetForm();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <img
              src="/artstoplogo.png"
              alt="ArtStop"
              className="h-8 w-auto object-contain drop-shadow-sm"
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Simple controls to add products and view basic stats.</p>
            </div>
          </div>
          <div className="hidden sm:block">
            <Link to="/">
              <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                View Storefront
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="text-sm text-gray-500">Categories</div>
              <div className="text-2xl font-semibold text-gray-900">{stats.totalCategories}</div>
            </CardContent>
          </Card>
          <Card className="bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="text-sm text-gray-500">Collections</div>
              <div className="text-2xl font-semibold text-gray-900">{stats.totalCollections}</div>
            </CardContent>
          </Card>
          <Card className="bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="text-sm text-gray-500">Products</div>
              <div className="text-2xl font-semibold text-gray-900">{stats.totalProducts}</div>
            </CardContent>
          </Card>
          <Card className="bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="text-sm text-gray-500">Orders</div>
              <div className="text-2xl font-semibold text-gray-900">{stats.totalOrders}</div>
            </CardContent>
          </Card>
        </div>

        {/* Main */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Add Product */}
          <div className="lg:col-span-2">
            <Card className="bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 border border-gray-200 rounded-lg shadow-sm">
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Product</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="sm:col-span-2">
                    <label className="block text-sm text-gray-700 mb-1">Product Name</label>
                    <input
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full border-gray-300 rounded-md"
                      placeholder="e.g. Ayatul Kursi Wall Art"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Category</label>
                    <select
                      value={form.category}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          category: e.target.value,
                          existingCollection: "",
                          newCollectionName: "",
                        })
                      }
                      className="w-full border-gray-300 rounded-md"
                    >
                      {categoriesData.map((c) => (
                        <option key={c.slug} value={c.slug}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Collection Mode */}
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Collection</label>
                    <div className="flex items-center gap-4">
                      <label className="inline-flex items-center gap-2">
                        <input
                          type="radio"
                          name="mode"
                          checked={form.mode === "existing"}
                          onChange={() => setForm({ ...form, mode: "existing" })}
                        />
                        <span className="text-sm text-gray-700">Existing</span>
                      </label>
                      <label className="inline-flex items-center gap-2">
                        <input
                          type="radio"
                          name="mode"
                          checked={form.mode === "new"}
                          onChange={() => setForm({ ...form, mode: "new" })}
                        />
                        <span className="text-sm text-gray-700">New</span>
                      </label>
                    </div>
                  </div>

                  {/* Existing Collection */}
                  {form.mode === "existing" && (
                    <div className="sm:col-span-2">
                      <label className="block text-sm text-gray-700 mb-1">Choose Existing Collection</label>
                      <select
                        value={form.existingCollection}
                        onChange={(e) => setForm({ ...form, existingCollection: e.target.value })}
                        className="w-full border-gray-300 rounded-md"
                      >
                        <option value="">Select collection</option>
                        {availableCollections.map((col) => (
                          <option key={col} value={col}>
                            {col}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* New Collection */}
                  {form.mode === "new" && (
                    <div className="sm:col-span-2">
                      <label className="block text-sm text-gray-700 mb-1">New Collection Name</label>
                      <input
                        value={form.newCollectionName}
                        onChange={(e) => setForm({ ...form, newCollectionName: e.target.value })}
                        className="w-full border-gray-300 rounded-md"
                        placeholder="e.g. Limited Edition"
                      />
                    </div>
                  )}

                  {/* Price */}
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Price (₹)</label>
                    <input
                      value={form.price}
                      onChange={(e) => setForm({ ...form, price: e.target.value })}
                      className="w-full border-gray-300 rounded-md"
                      placeholder="8000"
                    />
                  </div>

                  {/* Stock / Featured */}
                  <div className="flex items-center gap-4">
                    <label className="inline-flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={form.inStock}
                        onChange={(e) => setForm({ ...form, inStock: e.target.checked })}
                      />
                      <span className="text-sm text-gray-700">In Stock</span>
                    </label>
                    <label className="inline-flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={form.featured}
                        onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                      />
                      <span className="text-sm text-gray-700">Featured</span>
                    </label>
                  </div>

                  {/* Image */}
                  <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-sm text-gray-700 mb-1">Product Image URL (optional)</label>
                      <input
                        value={form.imageUrl}
                        onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                        className="w-full border-gray-300 rounded-md"
                        placeholder="https://..."
                      />
                      <div className="mt-3">
                        <label className="block text-sm text-gray-700 mb-1">Or Upload Image</label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => onPickFile(e.target.files?.[0])}
                          className="w-full"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Preview</label>
                      <div className="w-full h-28 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
                        {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                        <img
                          src={
                            imagePreview?.trim() ||
                            form.imageUrl?.trim() ||
                            "https://picsum.photos/seed/placeholder/200/200"
                          }
                          alt="Product preview"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = "https://picsum.photos/seed/placeholder/200/200";
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="sm:col-span-2 flex gap-3 pt-2">
                    <Button className="bg-indigo-600 hover:bg-indigo-700" onClick={handleCreateProduct}>
                      Add Product
                    </Button>
                    <Button
                      variant="outline"
                      className="border-gray-300 text-gray-700 hover:bg-gray-50"
                      onClick={resetForm}
                    >
                      Reset
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Snapshot: Recent Products + Orders */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 border border-gray-200 rounded-lg shadow-sm">
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Products</h3>
                <div className="space-y-3 max-h-[360px] overflow-y-auto pr-2">
                  {[...productsData].reverse().slice(0, 12).map((p) => (
                    <div key={p.id} className="border border-gray-200 rounded-md p-3">
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden">
                          <img
                            src={
                              p.images?.[0] ||
                              `https://picsum.photos/seed/${encodeURIComponent(slugify(p.name))}/200/200`
                            }
                            alt={p.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = `https://picsum.photos/seed/${encodeURIComponent(
                                slugify(p.name)
                              )}/200/200`;
                            }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-gray-900 truncate">{p.name}</div>
                          <div className="text-xs text-gray-500 truncate">
                            {p.category} • {p.collection}
                          </div>
                          <div className="text-sm text-gray-900">₹{numberOr(p.price).toLocaleString()}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {!productsData.length && <div className="text-sm text-gray-500">No products yet.</div>}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 border border-gray-200 rounded-lg shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">
                    {stats.totalOrders}
                  </span>
                </div>
                <div className="space-y-3 max-h-[280px] overflow-y-auto pr-2">
                  {Array.isArray(orders) && orders.length ? (
                    [...orders]
                      .slice(0, 6)
                      .map((o) => (
                        <div key={o.id} className="border border-gray-200 rounded-md p-3">
                          <div className="flex items-center justify-between">
                            <div className="text-sm font-medium text-gray-900">#{o.id}</div>
                            <div className="text-xs text-gray-500">
                              {new Date(o.date).toLocaleDateString()}
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-1">
                            <div className="text-xs capitalize text-gray-600">{o.status}</div>
                            <div className="text-sm font-semibold text-gray-900">
                              ₹{numberOr(o.total).toLocaleString()}
                            </div>
                          </div>
                        </div>
                      ))
                  ) : (
                    <div className="text-sm text-gray-500">No orders yet.</div>
                  )}
                </div>
                <div className="mt-3">
                  <Link to="/orders">
                    <Button variant="outline" className="w-full border-gray-300">
                      View All Orders
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;