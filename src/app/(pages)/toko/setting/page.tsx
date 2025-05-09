"use client";
import React, { useState } from "react";
import Image from "next/image";

const StoreSettingsPage: React.FC = () => {
  const [form, setForm] = useState({
    name: "Toko Tani Sejahtera",
    description: "Menjual hasil panen langsung dari petani lokal.",
    location: "Kabupaten Temanggung, Jawa Tengah",
    contact: "https://wa.me/6285158611725",
    instagram: "https://instagram.com/tokotanisejahtera",
    facebook: "https://facebook.com/tokotanisejahtera",
    schedule: "Senin - Sabtu, 08:00 - 17:00",
    status: "Aktif",
    logo: "/toko.jpg",
    banner: "/banner.jpg",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Data toko disimpan:", form);
    alert("Pengaturan toko berhasil disimpan!");
  };

  return (
    <section className="mx-auto mt-[70px] max-w-4xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">Pengaturan Toko</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nama Toko */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nama Toko
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border px-3 py-2 text-gray-800 shadow-sm"
            placeholder="name"
          />
        </div>

        {/* Deskripsi */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Deskripsi
          </label>
          <textarea
            placeholder="Enter your description..."
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            className="mt-1 w-full rounded-md border px-3 py-2 text-gray-800 shadow-sm"
          />
        </div>

        {/* Lokasi */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Lokasi
          </label>
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border px-3 py-2 text-gray-800 shadow-sm"
            placeholder="location"
            title="location"
          />
        </div>

        {/* Kontak & Sosial Media */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              WhatsApp
            </label>
            <input
              name="contact"
              value={form.contact}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border px-3 py-2 text-gray-800 shadow-sm"
              placeholder="Masukkan nomor WhatsApp"
              title="Nomor WhatsApp yang dapat dihubungi"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Instagram
            </label>
            <input
              name="instagram"
              value={form.instagram}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border px-3 py-2 text-gray-800 shadow-sm"
              placeholder="Masukkan username Instagram"
              title="Username Instagram toko"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Facebook
            </label>
            <input
              name="facebook"
              value={form.facebook}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border px-3 py-2 text-gray-800 shadow-sm"
              placeholder="Masukkan URL Facebook"
              title="URL Facebook toko"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Jam Operasional
            </label>
            <input
              name="schedule"
              value={form.schedule}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border px-3 py-2 text-gray-800 shadow-sm"
              placeholder="Masukkan jam operasional"
              title="Jam operasional toko"
            />
          </div>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            title="status"
            name="status"
            value={form.status}
            onChange={() => handleChange}
            className="mt-1 w-full rounded-md border px-3 py-2 text-gray-800 shadow-sm"
          >
            <option>Aktif</option>
            <option>Nonaktif</option>
          </select>
        </div>

        {/* Logo dan Banner (Dummy) */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Logo
            </label>
            <Image
              src={form.logo}
              alt="Store Logo"
              width={100}
              height={100}
              className="mt-2 rounded-md object-cover"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Banner
            </label>
            <Image
              src={form.banner}
              alt="Store Banner"
              width={300}
              height={100}
              className="mt-2 rounded-md object-cover"
            />
          </div>
        </div>

        {/* Submit */}
        <div>
          <button
            type="submit"
            className="rounded-md bg-green-600 px-6 py-2 text-white transition hover:bg-green-700"
          >
            Simpan Pengaturan
          </button>
        </div>
      </form>
    </section>
  );
};

export default StoreSettingsPage;
