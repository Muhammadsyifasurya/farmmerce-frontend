"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import iconFarmmerce from "../../../../public/farmmerce-iconic.svg";
import TermsModal from "@/components/popups/TermModal";
import InputField from "@/components/ui/InputField";
import { useRegister } from "@/hooks/auth/useRegister";
import CustomButton from "@/components/ui/CustomButton";
import {
  Register,
  registerStore,
  setRegister,
} from "@/app/stores/auth/register";
import { useStore } from "@nanostores/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const { acceptTerms, setAcceptTerms, setUser } = useRegister();
  const form = useStore(registerStore);

  const genderOptions = [
    { label: "Select gender", value: "" },
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [step, setStep] = useState(1);
  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Cek apakah semua field sudah diisi
    if (
      !form.email ||
      !form.username ||
      !form.password ||
      !form.confirmPassword ||
      !form.first_name ||
      !form.last_name ||
      !form.address ||
      !form.postalCode
    ) {
      setRegister({ error: "All fields are required." });
      toast.error("All fields are required.");
      return;
    }
    // Cek apakah password dan confirm password cocok
    if (form.password !== form.confirmPassword) {
      setRegister({ error: "Passwords do not match." });
      toast.error("Passwords do not match.");
      return;
    }
    if (!acceptTerms) {
      setRegister({ error: "You must accept the terms and conditions." });
      toast.error("You must accept the terms and conditions.");
      return;
    }

    await Register();
  };

  return (
    <section className="flex h-screen w-full items-center justify-center bg-gray-900">
      <ToastContainer position="top-right" autoClose={3000} />
      {/* Form Container */}
      <div className="w-full max-w-md rounded-lg bg-gray-800 p-8 shadow-lg backdrop-blur-md">
        {/* Heading */}
        <div className="flex flex-col items-center gap-2 text-center">
          <Image src={iconFarmmerce} width={60} height={60} alt="logo" />
          <div>
            <h1 className="animate-fade-in bg-gradient-to-r from-indigo-400 to-green-400 bg-clip-text text-4xl font-bold text-transparent">
              Create Account
            </h1>
            <p className="mt-2 text-sm text-gray-400">
              Please fill in the form to create your account.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-6">
          {step === 1 && (
            <>
              <InputField
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => setRegister({ email: e.target.value })}
                label="Email"
                placeholder="Enter your email"
              />
              <InputField
                id="username"
                type="text"
                value={form.username}
                onChange={(e) => setRegister({ username: e.target.value })}
                label="Username"
                placeholder="Enter your username"
              />
              <InputField
                id="password"
                type="password"
                value={form.password}
                onChange={(e) => setRegister({ password: e.target.value })}
                label="Password"
                placeholder="Create a password"
              />
              <InputField
                id="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={(e) =>
                  setRegister({ confirmPassword: e.target.value })
                }
                label="Confirm Password"
                placeholder="Confirm your password"
              />
              <button
                type="button"
                onClick={nextStep}
                className="w-full rounded bg-green-500 px-4 py-2 text-white"
              >
                Next
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <InputField
                id="firstName"
                type="text"
                value={form.first_name}
                onChange={(e) => setRegister({ first_name: e.target.value })}
                label="First Name"
                placeholder="Enter your first name"
              />
              <InputField
                id="lastName"
                type="text"
                value={form.last_name}
                onChange={(e) => setRegister({ last_name: e.target.value })}
                label="Last Name"
                placeholder="Enter your last name"
              />

              {/* Gender dropdown */}
              <div>
                <label htmlFor="gender" className="text-sm text-white">
                  Gender
                </label>
                <select
                  id="gender"
                  value={form.gender}
                  onChange={(e) => setRegister({ gender: e.target.value })}
                  className="w-full rounded-md border border-gray-600 bg-gray-700 p-2 text-white"
                >
                  {genderOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <InputField
                id="address"
                type="text"
                value={form.address}
                onChange={(e) => setRegister({ address: e.target.value })}
                label="Address"
                placeholder="Enter your address"
              />
              <InputField
                id="postalCode"
                type="number"
                value={form.postalCode}
                onChange={(e) => setRegister({ postalCode: e.target.value })}
                label="Postal Code"
                placeholder="Enter postal code"
              />

              {/* Terms */}
              <div className="flex items-center space-x-2">
                <input
                  id="acceptTerms"
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={() => setAcceptTerms(!acceptTerms)}
                  className="h-4 w-4 rounded border-gray-600 text-green-500"
                />
                <label htmlFor="acceptTerms" className="text-sm text-gray-400">
                  I agree to the{" "}
                  <button
                    onClick={openModal}
                    className="text-green-500 hover:underline"
                    type="button"
                  >
                    Terms and Conditions
                  </button>
                </label>
              </div>

              {/* Buttons */}
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="rounded bg-gray-600 px-4 py-2 text-white"
                >
                  Back
                </button>

                <CustomButton
                  type="submit"
                  label="Sign Up"
                  loading={form.loading}
                  variant="primary"
                  size="medium"
                />
              </div>
            </>
          )}
          <p className="text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-green-400 hover:underline"
            >
              Sign In
            </Link>
          </p>
        </form>
      </div>

      <TermsModal isModalOpen={isModalOpen} closeModal={closeModal} />
    </section>
  );
};

export default RegisterPage;
