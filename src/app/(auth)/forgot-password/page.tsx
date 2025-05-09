"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import iconFarmmerce from "../../../../public/farmmerce-iconic.svg";
import { fetchData } from "@/app/services/api";
import InputField from "@/components/ui/InputField";
import CustomButton from "@/components/ui/CustomButton";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [touched, setTouched] = useState(false);

  const fieldError = touched && !email ? "Please enter your email." : "";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      await fetchData({
        endpoint: "/auth/forgot-password",
        method: "POST",
        data: { email },
      });

      setSuccessMessage("Reset link has been sent to your email!");
      setEmail(""); // Reset form
    } catch (err: unknown) {
      // Optionally log the error here if needed
      console.error(err); // Handling the error if needed
      setErrorMessage("An error occurred while sending the reset link."); // Optional message
    } finally {
      setLoading(false);
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
              Forgot Password
            </h1>
            <p className="mt-2 text-sm text-gray-400">
              Enter your email and we'll send you a reset link.
            </p>
          </div>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <InputField
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setTouched(true)}
            placeholder="Enter your email"
            label="Email Address"
            error={fieldError} // atau bisa disesuaikan kalau mau lebih spesifik
          />

          {/* Success or Error Messages */}
          {successMessage && (
            <p className="text-center text-sm text-green-400">
              {successMessage}
            </p>
          )}
          {errorMessage && (
            <p className="text-center text-sm text-red-400">{errorMessage}</p>
          )}

          {/* Reset Password Button */}
          <CustomButton
            type="submit"
            label="Send Reset Link"
            loading={loading}
            variant="primary"
            size="medium"
            className="mt-4 w-full cursor-pointer hover:scale-105"
          />

          {/* Back to Sign In */}
          <p className="text-center text-sm text-gray-400">
            Remember your password?
            <Link
              href="/login"
              className="font-semibold text-green-400 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default ForgotPasswordPage;
