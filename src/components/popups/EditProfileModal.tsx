"use client";

import { useEffect, useState } from "react";
import { UserProfile } from "@/app/types/auth";
import { toast } from "react-toastify";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate?: () => void; // Optional: untuk refresh profile di parent
}

const EditProfileModal = ({
  isOpen,
  onClose,
  onUpdate,
}: EditProfileModalProps) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    gender: "",
    address: "",
    postal_code: "",
  });

  useEffect(() => {
    if (!isOpen) return;

    const userString = sessionStorage.getItem("user");
    if (!userString) return;

    const userData: UserProfile = JSON.parse(userString);
    setUser(userData);
    setForm({
      first_name: userData.first_name || "",
      last_name: userData.last_name || "",
      gender: userData.gender || "",
      address: userData.address || "",
      postal_code: userData.postal_code?.toString() || "",
    });
  }, [isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.first_name || !form.last_name) {
      toast.error("Name fields cannot be empty!");
      return;
    }

    const updatedUser = {
      ...user,
      ...form,
      postal_code: parseInt(form.postal_code) || 0,
    };

    sessionStorage.setItem("user", JSON.stringify(updatedUser));
    toast.success("Profile updated!");
    onUpdate?.(); // Notify parent
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="bg-opacity-50 fixed inset-0 z-[9999] flex items-center justify-center bg-black p-4 backdrop-blur-sm"
      onClick={onClose} // klik di area luar tutup modal
    >
      <div
        className="relative w-full max-w-xl rounded-lg bg-gray-800 p-6 text-white shadow-lg"
        onClick={(e) => e.stopPropagation()} // cegah close saat klik di dalam modal
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl text-gray-400 hover:text-white"
        >
          &times;
        </button>

        <h2 className="mb-6 text-xl font-bold text-green-400">Edit Profile</h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          <Input
            label="First Name"
            name="first_name"
            value={form.first_name}
            onChange={handleChange}
          />
          <Input
            label="Last Name"
            name="last_name"
            value={form.last_name}
            onChange={handleChange}
          />
          <Select
            label="Gender"
            name="gender"
            value={form.gender}
            onChange={handleChange}
            options={["Male", "Female", "Other"]}
          />
          <Input
            label="Postal Code"
            name="postal_code"
            value={form.postal_code}
            onChange={handleChange}
            type="number"
          />
          <div className="sm:col-span-2">
            <Input
              label="Address"
              name="address"
              value={form.address}
              onChange={handleChange}
            />
          </div>

          <div className="mt-2 sm:col-span-2">
            <button
              type="submit"
              className="w-full rounded bg-green-500 py-2 font-semibold transition hover:bg-green-600"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Helper Components
const Input = ({
  label,
  name,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}) => (
  <div>
    <label className="block text-sm text-gray-300">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="mt-1 w-full rounded bg-gray-700 p-2 outline-none focus:ring-2 focus:ring-green-400"
      placeholder={`Enter your ${name}`}
    />
  </div>
);

const Select = ({
  label,
  name,
  value,
  onChange,
  options,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
}) => (
  <div>
    <label className="block text-sm text-gray-300">{label}</label>
    <select
      title="select"
      name={name}
      value={value}
      onChange={onChange}
      className="mt-1 w-full rounded bg-gray-700 p-2 text-white outline-none focus:ring-2 focus:ring-green-400"
    >
      <option value="">Select</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

export default EditProfileModal;
