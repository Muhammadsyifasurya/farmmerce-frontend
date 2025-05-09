"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import iconFarmmerce from "../../../../public/farmmerce-iconic.svg";
import { useLogin } from "@/hooks/auth/useLogin";
import InputField from "@/components/ui/InputField";
import CustomButton from "@/components/ui/CustomButton";
import { authStore, set, login } from "@/app/stores/login";
import { useStore } from "@nanostores/react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const store = useStore(authStore);
  const auth = useStore(authStore);
  const router = useRouter();
  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  const fieldError = {
    email: touched.email && !auth.id ? "Please enter your email." : "",
    password:
      touched.password && !auth.password ? "Please enter your password." : "",
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { id, password } = authStore.get();
    if (!id || !password) {
      alert("Email dan password harus diisi."); // ganti alert sesuai selera
      return;
    }

    try {
      await login();
      router.push("/");
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <section className="flex h-screen w-full items-center justify-center bg-gray-900">
      {/* Form Container */}
      <div className="w-full max-w-md rounded-lg bg-gray-800 p-8 shadow-lg backdrop-blur-md">
        {/* Heading */}
        <div className="flex flex-col items-center gap-2 text-center">
          <Image src={iconFarmmerce} width={60} height={60} alt="logo" />
          <div>
            <h1 className="animate-fade-in bg-gradient-to-r from-indigo-400 to-green-400 bg-clip-text text-4xl font-bold text-transparent">
              Welcome Back!
            </h1>
            <p className="mt-2 text-sm text-gray-400">
              Please sign in to your account.
            </p>
          </div>
        </div>
    
        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <InputField
            id="email"
            type="email"
            value={auth.id}
            onChange={(e) => set({ id: e.target.value })}
            onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
            placeholder="Enter your email"
            label="Email"
            error={fieldError.email}
          />

          <InputField
            id="password"
            type="password"
            value={auth.password}
            onChange={(e) => set({ password: e.target.value })}
            onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
            label="Password"
            placeholder="••••••••"
            error={fieldError.password}
          />

          {/* Remember Me and Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <input
                id="remember"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-600 text-green-500"
                // checked={rememberMe}
                // onChange={() => setRememberMe(!rememberMe)}
              />
              <label htmlFor="remember" className="text-sm text-gray-400">
                Remember me
              </label>
            </div>
            <Link
              href="/forgot-password"
              className="text-sm text-green-500 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Sign In Button */}

          <CustomButton
            type="submit"
            label="Sign In"
            // loading={loading}
            variant="primary"
            size="medium"
            className="mt-4 w-full cursor-pointer hover:scale-105"
          />

          <p className="text-center text-sm text-gray-400">
            Don’t have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-green-400 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
