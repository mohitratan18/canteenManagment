"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { adminLogin, login } from "@/lib/api";
import { Loader } from "@/components/ui/loader";
import { EyeOpenIcon, EyeClosedIcon } from "@radix-ui/react-icons";

export default function LoginPage() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const {
    isAdminAuthenticated,
    isAuthenticated,
    setIsAdminAuthenticated,
    setIsAuthenticated,
  } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (isAdmin) {
        const response = await adminLogin({ email, password });
        if (response.status == 200) {
          setIsAdminAuthenticated(true);
          localStorage.setItem("auth", response.data.token);
          localStorage.setItem("email", response.data.email);
          localStorage.setItem("role", "ADMIN");
          router.push("/admin");
        } else {
          alert(response.data.message);
        }
      } else {
        const response = await login({ email, password });
        console.log(response);
        if (response.status == 200) {
          setIsAuthenticated(true);
          localStorage.setItem("auth", response.data.token);
          localStorage.setItem("email", response.data.email);
          router.push("/menu");
        } else {
          alert(response.data.message);
        }
      }
    } catch (error) {
      console.error(error);
      alert("Please try again");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
      <div className="flex flex-col items-center justify-center mb-8">
        <img
          src="https://media.licdn.com/dms/image/v2/C561BAQGBuYc_zqhKpw/company-background_10000/company-background_10000/0/1648874612968/viitvizag_cover?e=2147483647&v=beta&t=obAVvP8BszPR6WxhP6dRoaedvgoNyX_0qCAgFbS5ScE"
          className="w-[500px] h-[100px]"
        />
      </div>
      <Card className="w-full max-w-md p-8 space-y-8 no-hover !important">
        {" "}
        {/* Added no-hover class */}
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
              />
              <Button
                variant="ghost"
                type="button"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2"
                onClick={(e) => {
                  e.preventDefault();
                  setShowPassword(!showPassword);
                }}
              >
                {showPassword ? <EyeClosedIcon /> : <EyeOpenIcon />}
              </Button>
            </div>
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
