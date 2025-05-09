"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { FaEdit, FaTrash } from "react-icons/fa";
import { products } from "@/data/dummyData";

const ManageProducts: React.FC = () => {
  const currentStoreId = "1"; // ID toko yang sedang login, nanti ambil dari context atau auth

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => p.store.store_id === currentStoreId)
      .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
  }, [search]);

  const paginatedProducts = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, page]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div className="mx-auto mt-[70px] min-h-screen max-w-6xl px-4 pt-[40px]">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">Kelola Produk</h1>
        <button className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700">
          + Tambah Produk
        </button>
      </div>

      <input
        type="text"
        placeholder="Cari produk..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 w-full rounded border px-4 py-2 text-sm focus:outline-none"
      />

      <div className="overflow-x-auto rounded-lg border shadow-sm">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gray-100 text-left text-xs uppercase">
            <tr>
              <th className="px-4 py-2">Gambar</th>
              <th className="px-4 py-2">Nama</th>
              <th className="px-4 py-2">Kategori</th>
              <th className="px-4 py-2">Harga</th>
              <th className="px-4 py-2">Stok</th>
              <th className="px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {paginatedProducts.map((product) => (
              <tr key={product.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={40}
                    height={40}
                    className="rounded object-cover"
                  />
                </td>
                <td className="px-4 py-2 font-medium">{product.name}</td>
                <td className="px-4 py-2">{product.category}</td>
                <td className="px-4 py-2">
                  Rp {product.price.toLocaleString()}
                </td>
                <td className="px-4 py-2">{product.stock}</td>
                <td className="px-4 py-2">
                  <button className="mr-2 text-blue-600 hover:text-blue-800">
                    <FaEdit />
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm">
        <p>
          Menampilkan {paginatedProducts.length} dari {filteredProducts.length}{" "}
          produk
        </p>
        <div className="space-x-2">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="rounded bg-gray-200 px-3 py-1 hover:bg-gray-300 disabled:opacity-50"
          >
            Sebelumnya
          </button>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="rounded bg-gray-200 px-3 py-1 hover:bg-gray-300 disabled:opacity-50"
          >
            Selanjutnya
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageProducts;
