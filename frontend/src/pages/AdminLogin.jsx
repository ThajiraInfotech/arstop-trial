import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useToast } from "../hooks/use-toast";

const ADMIN_USER = "admin";
const ADMIN_PASS = "admin123";

const AdminLogin = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
    showPassword: false,
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // If already logged in, go to dashboard
    try {
      const session = localStorage.getItem("artstop_admin");
      if (session) {
        navigate("/admin/dashboard", { replace: true });
      }
    } catch {
      // ignore
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (submitting) return;

    const username = form.username.trim();
    const password = form.password;

    if (!username || !password) {
      toast({
        title: "Missing credentials",
        description: "Enter both username and password.",
      });
      return;
    }

    setSubmitting(true);

    // Simple credential check (replace with real auth when backend is available)
    setTimeout(() => {
      if (username === ADMIN_USER && password === ADMIN_PASS) {
        localStorage.setItem(
          "artstop_admin",
          JSON.stringify({ username, loggedInAt: Date.now() })
        );
        window.dispatchEvent(new CustomEvent("adminAuthUpdated"));
        toast({ title: "Welcome", description: "Logged in to admin panel." });
        navigate("/admin/dashboard", { replace: true });
      } else {
        toast({
          title: "Invalid credentials",
          description: "The username or password is incorrect.",
        });
      }
      setSubmitting(false);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-md mx-auto px-4">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <img
              src="/artstoplogo.png"
              alt="ArtStop"
              className="h-12 w-auto mx-auto object-contain drop-shadow-sm"
            />
          </Link>
          <h1 className="mt-4 text-2xl font-bold text-gray-900">Admin Login</h1>
          <p className="text-gray-600 text-sm">Use your admin credentials to access the dashboard</p>
        </div>

        <Card className="bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 border border-gray-200 rounded-xl shadow-md">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="admin"
                  value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                  autoComplete="username"
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <div className="flex gap-2">
                  <Input
                    id="password"
                    type={form.showPassword ? "text" : "password"}
                    placeholder="********"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    autoComplete="current-password"
                  />
                </div>
                <label className="inline-flex items-center gap-2 mt-2">
                  <input
                    type="checkbox"
                    checked={form.showPassword}
                    onChange={(e) =>
                      setForm({ ...form, showPassword: e.target.checked })
                    }
                  />
                  <span className="text-sm text-gray-700">Show password</span>
                </label>
              </div>

              <Button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700"
                disabled={submitting}
              >
                {submitting ? "Signing in..." : "Sign In"}
              </Button>

              <div className="text-xs text-gray-500 mt-2">
                Hint: username: <b>admin</b>, password: <b>admin123</b>
              </div>
            </form>

            <div className="mt-6 text-center">
              <Link to="/" className="text-sm text-indigo-600 hover:underline">
                Back to Store
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminLogin;