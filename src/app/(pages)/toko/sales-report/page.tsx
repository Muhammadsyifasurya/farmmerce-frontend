"use client";
import {
  FaChartBar,
  FaBoxOpen,
  FaMoneyBillWave,
  FaShoppingCart,
} from "react-icons/fa";
import React from "react";

const stats = {
  totalSales: 1470000,
  totalOrders: 142,
  totalProducts: 25,
  topProducts: [
    { name: "Beras Organik Premium", sold: 56 },
    { name: "Pupuk Organik Kompos", sold: 40 },
    { name: "Sayuran Segar Campuran", sold: 31 },
  ],
};

const SalesStatsPage: React.FC = () => {
  return (
    <section className="mx-auto mt-[80px] min-h-[60vh] max-w-5xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">
        Statistik Penjualan
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        <div className="rounded-lg bg-white p-5 shadow">
          <div className="mb-2 flex items-center gap-2 text-green-600">
            <FaMoneyBillWave />
            <p className="text-sm font-medium text-gray-500">
              Total Pendapatan
            </p>
          </div>
          <p className="text-xl font-semibold text-gray-800">
            Rp {stats.totalSales.toLocaleString()}
          </p>
        </div>
        <div className="rounded-lg bg-white p-5 shadow">
          <div className="mb-2 flex items-center gap-2 text-blue-600">
            <FaShoppingCart />
            <p className="text-sm font-medium text-gray-500">Jumlah Pesanan</p>
          </div>
          <p className="text-xl font-semibold text-gray-800">
            {stats.totalOrders}
          </p>
        </div>
        <div className="rounded-lg bg-white p-5 shadow">
          <div className="mb-2 flex items-center gap-2 text-yellow-600">
            <FaBoxOpen />
            <p className="text-sm font-medium text-gray-500">Produk Dikelola</p>
          </div>
          <p className="text-xl font-semibold text-gray-800">
            {stats.totalProducts}
          </p>
        </div>
      </div>

      {/* Top Products */}
      <div className="mt-10">
        <h2 className="mb-4 text-lg font-semibold text-gray-800">
          Produk Terlaris
        </h2>
        <div className="space-y-3">
          {stats.topProducts.map((product, i) => (
            <div
              key={i}
              className="flex justify-between rounded-md bg-gray-50 px-4 py-2 shadow-sm"
            >
              <p className="text-gray-700">{product.name}</p>
              <p className="font-semibold text-gray-800">
                {product.sold} terjual
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SalesStatsPage;
