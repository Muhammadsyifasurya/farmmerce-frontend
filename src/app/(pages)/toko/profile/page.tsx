"use client";
import Image from "next/image";
import React from "react";
import {
  FaInstagram,
  FaFacebookF,
  FaWhatsapp,
  FaBoxOpen,
  FaShoppingCart,
  FaStar,
} from "react-icons/fa";
import Link from "next/link";

const StoreProfile: React.FC = () => {
  const store = {
    name: "Toko Tani Sejahtera",
    description:
      "Menjual hasil panen langsung dari petani lokal dengan kualitas terbaik dan harga bersaing. Dukung pertanian lokal bersama kami!",
    banner: "/banner.jpg",
    logo: "/toko.jpg",
    contact: "https://wa.me/6285158611725",
    location: "Kabupaten Temanggung, Jawa Tengah",
    stats: {
      products: 25,
      orders: 142,
      rating: 4.8,
    },
    schedule: "Senin - Sabtu, 08:00 - 17:00",
    status: "Aktif",
    social: {
      instagram: "https://instagram.com/tokotanisejahtera",
      facebook: "https://facebook.com/tokotanisejahtera",
    },
  };

  return (
    <section className="mx-auto mt-[70px] max-w-6xl px-4 py-10 md:px-8">
      {/* Banner */}
      <div className="relative h-56 w-full overflow-hidden rounded-xl md:h-72">
        <Image
          src={store.banner}
          alt="Store Banner"
          fill
          className="object-cover object-center"
        />
      </div>

      {/* Store Info */}
      <div className="relative -mt-14 flex flex-col items-center rounded-xl bg-white p-6 md:flex-row md:items-start md:gap-6">
        <div className="h-28 w-28 flex-shrink-0 overflow-hidden rounded-full border-4 border-white shadow-md md:h-32 md:w-32">
          <Image
            src={store.logo}
            alt="Store Logo"
            width={128}
            height={128}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="mt-4 text-center md:mt-0 md:text-left">
          <h1 className="text-2xl font-bold text-gray-800">{store.name}</h1>
          <p className="mt-2 text-gray-600">{store.description}</p>
          <div className="mt-2 space-y-1 text-sm text-gray-500">
            <p>📍 {store.location}</p>
            <p>🕘 Jam Operasional: {store.schedule}</p>
            <p>
              ✅ Status:{" "}
              <span className="font-semibold text-green-600">
                {store.status}
              </span>
            </p>
          </div>
          <div className="mt-4 flex items-center justify-center gap-3 md:justify-start">
            {/* WhatsApp Button */}
            <Link
              href={store.contact}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-md bg-green-600 px-4 py-2 text-white transition hover:bg-green-700"
            >
              <FaWhatsapp />
              WhatsApp
            </Link>

            {/* Instagram Icon Button */}
            <Link
              href={store.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-600 text-white transition hover:bg-pink-700"
            >
              <FaInstagram size={20} />
            </Link>

            {/* Facebook Icon Button */}
            <Link
              href={store.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white transition hover:bg-blue-700"
            >
              <FaFacebookF size={18} />
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="mt-10 grid grid-cols-1 gap-4 rounded-xl bg-white p-6 shadow-sm md:mt-12 md:grid-cols-3">
        <div className="flex flex-col items-center border-b pb-4 md:border-r md:border-b-0 md:pb-0">
          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-700">
            <FaBoxOpen size={18} />
          </div>
          <p className="text-xl font-semibold text-gray-800">
            {store.stats.products}
          </p>
          <p className="text-sm text-gray-500">Produk</p>
        </div>
        <div className="flex flex-col items-center border-b pb-4 md:border-r md:border-b-0 md:pb-0">
          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-700">
            <FaShoppingCart size={18} />
          </div>
          <p className="text-xl font-semibold text-gray-800">
            {store.stats.orders}
          </p>
          <p className="text-sm text-gray-500">Pesanan</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-700">
            <FaStar size={18} />
          </div>
          <p className="text-xl font-semibold text-gray-800">
            {store.stats.rating}⭐
          </p>
          <p className="text-sm text-gray-500">Rating</p>
        </div>
      </div>

      {/* Featured Products */}
      <div className="mt-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">
            Produk Unggulan
          </h2>
          <div className="text-center">
            <Link
              href="/produk"
              className="group inline-flex items-center gap-1 text-sm font-medium text-green-700 transition-colors duration-300 hover:text-green-800"
            >
              <span className="relative">
                <span className="after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-green-700 after:transition-all after:duration-300 group-hover:after:w-full">
                  Jelajahi Katalog
                </span>
              </span>
              <svg
                className="ml-1 h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 5l7 7-7 7M5 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="rounded-lg border bg-white p-4 shadow-sm transition hover:shadow-md"
            >
              <Image
                src={`/produk-${i + 1}.jpg`}
                alt={`Produk ${i + 1}`}
                width={300}
                height={200}
                className="mb-3 h-40 w-full rounded-md object-cover"
              />
              <h3 className="text-lg font-semibold text-gray-800">
                Produk {i + 1}
              </h3>
              <p className="text-sm font-medium text-green-600">
                Rp {((i + 1) * 12000).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Customer Reviews */}
      <div className="mt-12">
        <h2 className="mb-6 text-xl font-semibold text-gray-800">
          Ulasan Pelanggan
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {[
            {
              name: "Rina",
              comment: "Produk segar dan pengiriman cepat!",
              rating: 5,
            },
            {
              name: "Andi",
              comment: "Petani ramah dan kualitas terbaik.",
              rating: 4,
            },
            {
              name: "Lina",
              comment: "Akan order lagi minggu depan!",
              rating: 5,
            },
          ].map((review, i) => (
            <div
              key={i}
              className="rounded-xl border bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 font-bold text-green-600">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{review.name}</p>
                  <div className="flex text-yellow-500">
                    {[...Array(review.rating)].map((_, idx) => (
                      <FaStar key={idx} size={14} />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 italic">"{review.comment}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StoreProfile;
