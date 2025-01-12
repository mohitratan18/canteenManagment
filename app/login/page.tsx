"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const {
    isAdminAuthenticated,
    isAuthenticated,
    setIsAdminAuthenticated,
    setIsAuthenticated,
  } = useAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (isAdmin) {
      setIsAdminAuthenticated(true);
      localStorage.setItem("auth", "admin");
      router.push("/admin");
    } else {
      setIsAuthenticated(true);
      localStorage.setItem("auth", "user");
      router.push("/menu");
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center gap-4">
      <Card className="w-full max-w-md p-6 space-y-8">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isAdmin"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            />
            <Label htmlFor="isAdmin">Login as Admin</Label>
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
        <div className="text-center">
          <p>
            Don't have an account ?{" "}
            <Link href="/signup" className="text-blue-500">
              Sign up
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}
