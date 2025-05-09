"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import React, { useState } from "react";
import {
  FiChevronRight,
  FiClipboard,
  FiHelpCircle,
  FiHome,
  FiInfo,
  FiMail,
  FiUsers,
} from "react-icons/fi";
import { AiOutlineShop } from "react-icons/ai"; // React Icon untuk Toko
import { RiShoppingCartLine } from "react-icons/ri"; // React Icon untuk Pesanan
import iconFarmmerce from "../../../../public/farmmerce-iconic.svg";

interface SidebarProps {
  isSidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar = ({ isSidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname();
  const user = { name: "John Doe", role: "seller" }; // Ganti dengan data pengguna yang sesuai

  const [isSellerMenuOpen, setSellerMenuOpen] = useState(false);
  if (!user) return null; // Pastikan ada user sebelum menampilkan sidebar

  const menuItems = [
    { href: "/", label: "Beranda", icon: <FiHome size={20} /> },
    {
      href: "/checkout",
      label: "Transaksi Saya",
      icon: <RiShoppingCartLine size={20} />,
    },
    ...(user.role === "seller"
      ? [
          {
            href: "#",
            label: "Toko Saya",
            icon: <AiOutlineShop size={20} />,
            subMenu: [
              { href: "/toko/profile", label: "Profile Toko" },
              { href: "/toko/manage-products", label: "Kelola Produk" },
              { href: "/toko/sales-report", label: "Statistik Penjualan" },
              { href: "/toko/setting", label: "Pengaturan Toko" },
            ],
          },
        ]
      : []),
    ...(user?.role === "admin"
      ? [
          {
            href: "/user-management",
            label: "Manajemen Pengguna",
            icon: <FiUsers size={20} />,
          },
        ]
      : []),
    {
      href: "/layanan-kami",
      label: "Layanan Kami",
      icon: <FiClipboard size={20} />, // Menyediakan layanan khusus
    },

    {
      href: "/about",
      label: "Tentang Kami",
      icon: <FiInfo size={20} />, // Lebih cocok untuk halaman About
    },
  ];

  return (
    <nav
      className={clsx(
        "fixed top-0 z-50 h-[100vh] w-[200px] overflow-hidden rounded-r-3xl border-[1px] border-[#30363D] bg-[#161B22] text-[#E8EEF4] transition-transform duration-300 ease-in-out md:w-[250px]",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full",
      )}
    >
      <button
        className="absolute right-4 rounded-xl text-[40px] font-bold text-gray-600 transition-all duration-300 ease-in-out hover:text-white"
        onClick={() => setSidebarOpen(false)} // Klik tombol silang untuk menutup sidebar
      >
        &times;
      </button>
      <div className="flex h-full flex-col items-start justify-between">
        <ul className="mt-4 flex w-full flex-col gap-2 text-[18px] font-semibold md:gap-3">
          <li className="ml-6 flex justify-start">
            <Image
              src={iconFarmmerce}
              alt="logo"
              width="45"
              height="45"
              className="mb-4"
            />
          </li>

          {menuItems.map(({ href, label, icon, subMenu }) => (
            <li key={href}>
              <Link
                href={href}
                className={clsx(
                  "flex gap-3 rounded-r-3xl px-3 py-2 text-sm transition-all duration-300 ease-in-out md:px-6 md:py-3",
                  pathname === href
                    ? "bg-[linear-gradient(180deg,_#2ecac8,_#388886)]"
                    : "hover:bg-[#93C0CA]",
                )}
                onClick={() => {
                  if (subMenu) setSellerMenuOpen(!isSellerMenuOpen);
                }}
              >
                <span className="text-xl">{icon}</span> {label}
                {subMenu && (
                  <span
                    className={clsx(
                      "ml-auto text-xl transition-transform duration-300 ease-in-out",
                      isSellerMenuOpen ? "rotate-90" : "rotate-0",
                    )}
                  >
                    <FiChevronRight size={20} />
                  </span>
                )}
              </Link>
              {subMenu && isSellerMenuOpen && (
                <ul
                  className="mt-2 ml-8 flex flex-col gap-1 overflow-hidden"
                  style={{
                    maxHeight: isSellerMenuOpen ? "500px" : "0px", // Menyesuaikan max-height agar animasi mulus
                    opacity: isSellerMenuOpen ? 1 : 0, // Menambahkan efek fade-in dan fade-out
                    transition:
                      "max-height 0.5s ease-in-out, opacity 0.5s ease-in-out", // Durasi transisi untuk kedua properti
                  }}
                >
                  {subMenu.map(({ href, label }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        className={clsx(
                          "flex gap-3 rounded-r-3xl px-3 py-2 text-sm transition-all duration-300 ease-in-out md:px-6 md:py-3",
                          pathname === href
                            ? "bg-[linear-gradient(180deg,_#2ecac8,_#388886)]"
                            : "hover:bg-[#93C0CA]",
                        )}
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
        <ul className="mt-auto w-full">
          <Link
            href="/faq"
            className={clsx(
              "flex gap-3 px-6 py-3 text-sm transition-all duration-300 ease-in-out",
              pathname === "/faq"
                ? "bg-[linear-gradient(180deg,_#2ecac8,_#388886)]"
                : "hover:bg-[#93C0CA]",
            )}
          >
            <span className="text-xl">
              {" "}
              <FiHelpCircle size={20} />
            </span>{" "}
            FAQ
          </Link>
          <Link
            href="/contact"
            className={clsx(
              "flex gap-3 px-6 py-3 text-sm transition-all duration-300 ease-in-out",
              pathname === "/contact"
                ? "bg-[linear-gradient(180deg,_#2ecac8,_#388886)]"
                : "hover:bg-[#93C0CA]",
            )}
          >
            <span className="text-xl">
              {" "}
              <FiMail size={20} />
            </span>{" "}
            Hubungi Kami
          </Link>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
