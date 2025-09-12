import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import Collections from "./pages/Collections";
import ProductListing from "./pages/ProductListing";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Orders from "./pages/Orders";
import Customize from "./pages/Customize";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// Admin imports
import Admin from "./pages/Admin"; // Acts as Dashboard
import AdminLogin from "./pages/AdminLogin";
import AdminNavbar from "./components/layout/AdminNavbar";

// Lazy placeholders for admin subpages (to be created)
import AdminOrders from "./pages/AdminOrders";
import AdminCustomers from "./pages/AdminCustomers";

function AdminProtected({ children }) {
  let isAuthed = false;
  try {
    isAuthed = !!localStorage.getItem("artstop_admin");
  } catch {
    isAuthed = false;
  }
  if (!isAuthed) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
}

function AppContent() {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isAdminLoginPage = location.pathname === "/admin/login";

  const isAdminAuthed = (() => {
    try {
      return !!localStorage.getItem("artstop_admin");
    } catch {
      return false;
    }
  })();

  const showUserNavbar = !isAuthPage && !isAdminRoute;
  const showAdminNavbar = isAdminRoute && !isAdminLoginPage && isAdminAuthed;

  const mainPaddingClass = isAdminRoute
    ? isAdminLoginPage
      ? "py-12"
      : "pt-16 pb-12"
    : isAuthPage
    ? "py-12"
    : "pt-16 pb-12";

  // Guard: prevent unauthenticated access to admin routes via direct URL
  if (isAdminRoute && !isAdminLoginPage && !isAdminAuthed) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="App min-h-screen bg-gray-50">
      {showUserNavbar && <Navbar />}
      {showAdminNavbar && <AdminNavbar />}

      <main className={mainPaddingClass}>
        <React.Suspense fallback={<div className="p-6 text-gray-600">Loading...</div>}>
          <Routes>
            {/* Storefront routes */}
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/categories/:category/collections" element={<Collections />} />
            <Route path="/categories/:category/collections/:collection" element={<ProductListing />} />
            <Route path="/categories/:category" element={<ProductListing />} />
            <Route path="/products" element={<ProductListing />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/customize" element={<Customize />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Admin auth */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<Navigate to="/admin/login" replace />} />

            {/* Admin protected pages */}
            <Route
              path="/admin/dashboard"
              element={
                <AdminProtected>
                  <Admin />
                </AdminProtected>
              }
            />
            <Route
              path="/admin/orders"
              element={
                <AdminProtected>
                  <AdminOrders />
                </AdminProtected>
              }
            />
            <Route
              path="/admin/customers"
              element={
                <AdminProtected>
                  <AdminCustomers />
                </AdminProtected>
              }
            />
          </Routes>
        </React.Suspense>
      </main>

      {showUserNavbar && <Footer />}
      <Toaster />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;