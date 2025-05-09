"use client";
import React from "react";
import { Leaf, Truck, CreditCard, Headphones } from "lucide-react"; // Pastikan kamu sudah install `lucide-react`

const Services: React.FC = () => {
  const services = [
    {
      title: "Produk Segar & Organik",
      description:
        "Kami menyediakan produk segar berkualitas langsung dari petani lokal yang telah melalui proses seleksi dan kontrol kualitas.",
      icon: <Leaf className="h-10 w-10 text-green-600" />,
    },
    {
      title: "Pengiriman Cepat & Aman",
      description:
        "Sistem logistik kami memastikan pesanan Anda dikirim tepat waktu, dengan kondisi produk tetap terjaga hingga ke tangan Anda.",
      icon: <Truck className="h-10 w-10 text-green-600" />,
    },
    {
      title: "Pembayaran Aman",
      description:
        "Nikmati kemudahan transaksi dengan sistem pembayaran yang fleksibel, aman, dan mendukung berbagai metode populer.",
      icon: <CreditCard className="h-10 w-10 text-green-600" />,
    },
    {
      title: "Layanan Pelanggan Responsif",
      description:
        "Tim support kami siap membantu Anda kapan saja melalui berbagai kanal seperti WhatsApp dan email.",
      icon: <Headphones className="h-10 w-10 text-green-600" />,
    },
  ];

  return (
    <section className="mx-auto mt-[70px] max-w-6xl px-4 py-16 md:px-8">
      <h2 className="text-center text-4xl font-bold text-green-700">
        Layanan Kami
      </h2>
      <p className="mt-4 text-center text-lg text-gray-600">
        Kami hadir untuk memberikan pengalaman belanja hasil pertanian yang
        mudah, aman, dan terpercaya.
      </p>

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service, index) => (
          <div
            key={index}
            className="flex flex-col items-center rounded-2xl border bg-white p-6 text-center shadow-sm transition hover:shadow-md"
          >
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
              {service.icon}
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-800">
              {service.title}
            </h3>
            <p className="text-sm text-gray-600">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
