"use client";

import React, { useState } from "react";
import CustomButton from "@/components/ui/CustomButton";
import {
  dummyAddress,
  dummyVoucher,
  shippingOptions,
  paymentMethods,
  dummyFreeShippingVoucher,
} from "@/data/dummyData";
import Image from "next/image";
import {
  $cartItems,
  removeFromCart,
  updateQuantity,
} from "@/app/stores/products/cartStores";
import { useStore } from "@nanostores/react";
import Link from "next/link";
import ConfirmModal from "@/components/popups/ConfirmModal";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";

const CheckoutPage: React.FC = () => {
  const [selectedPayment, setSelectedPayment] = useState("transfer");
  const [selectedShipping, setSelectedShipping] = useState("jne");
  const cartItems = useStore($cartItems) || [];
  const router = useRouter();
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const [voucherCode, setVoucherCode] = useState("");
  const [isVoucherApplied, setIsVoucherApplied] = useState(false);
  const [shippingVoucherCode, setShippingVoucherCode] = useState("");
  const [isFreeShippingApplied, setIsFreeShippingApplied] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  //Yes or not modal
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState<string | null>(null);
  const [showCreateOrderModal, setShowCreateOrderModal] = useState(false);

  const handleApplyFreeShippingVoucher = () => {
    if (shippingVoucherCode === dummyFreeShippingVoucher.code) {
      if (subtotal < dummyFreeShippingVoucher.minimumPurchase) {
        alert(
          `Minimal belanja Rp${dummyFreeShippingVoucher.minimumPurchase.toLocaleString(
            "id-ID",
          )} untuk menggunakan voucher ini.`,
        );
        return;
      }
      setIsFreeShippingApplied(true);
    } else {
      alert("Kode voucher ongkir tidak valid");
    }
  };

  const handleApplyVoucher = () => {
    if (voucherCode === dummyVoucher.code) {
      if (subtotal < dummyVoucher.minimumPurchase) {
        setErrorMessage(
          `Minimal belanja Rp${dummyVoucher.minimumPurchase.toLocaleString("id-ID")} untuk menggunakan voucher.`,
        );
        return;
      }
      setIsVoucherApplied(true);
      setErrorMessage("");
    } else {
      setErrorMessage("Kode voucher tidak valid");
    }
  };

  const shippingCost = isFreeShippingApplied
    ? 0
    : (shippingOptions.find((s) => s.id === selectedShipping)?.price ?? 0);

  const voucherDiscount =
    isVoucherApplied && subtotal >= dummyVoucher.minimumPurchase
      ? dummyVoucher.discount
      : 0;

  const total = subtotal + shippingCost - voucherDiscount;

  const handleCreateOrder = () => {
    setShowCreateOrderModal(true);
  };

  const confirmRemove = () => {
    if (itemToRemove) {
      removeFromCart(itemToRemove);
      setItemToRemove(null);
    }
    setShowRemoveModal(false);
  };

  return (
    <div className="mt-[70px] space-y-6 p-4 md:pt-10 xl:mx-[190px]">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center text-sm text-gray-600">
        <Link
          href="/"
          className="flex items-center gap-1 text-green-700 transition hover:underline"
        >
          <span className="font-medium">Beranda</span>
        </Link>

        <ChevronRight className="mx-1 h-4 w-4 text-gray-400" />

        <Link
          href="/cart"
          className="flex items-center gap-1 text-green-700 transition hover:underline"
        >
          <span className="font-medium">Keranjang</span>
        </Link>

        <ChevronRight className="mx-1 h-4 w-4 text-gray-400" />

        <span className="font-semibold text-gray-800">Checkout</span>
      </nav>
      <div className="flex flex-col space-y-6 md:flex-wrap md:justify-between xl:flex-row">
        <div className="flex flex-col space-y-6">
          {/* Alamat Penerima */}
          <section className="rounded-xl bg-white p-4 shadow">
            <h2 className="mb-2 font-bold md:text-lg">Alamat Penerima</h2>
            <div>
              <p className="font-medium">{dummyAddress.name}</p>
              <p>{dummyAddress.phone}</p>
              <p>{dummyAddress.address}</p>
              <button title="alamat" className="mt-2 text-sm text-green-600">
                Ubah Alamat
              </button>
            </div>
          </section>

          <section className="rounded-xl bg-white p-4 shadow">
            <h2 className="mb-2 font-bold md:text-lg">Item yang Dibeli</h2>
            <div className="space-y-4">
              {/* Kondisi jika cart kosong */}
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="64"
                      height="64"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="h-16 w-16 text-gray-400"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12h3m-3 0h-2m2 0v2m-2-2v-2m3 3v-2m3 0h-3m3 0v2m0 0v2m0-2h-2"
                      />
                    </svg>
                  </div>
                  <p className="text-lg font-medium text-gray-600">
                    Keranjang Anda kosong.
                  </p>
                  <p className="mt-2 text-sm text-gray-400">
                    Sepertinya Anda belum memilih barang. Ayo tambahkan beberapa
                    produk ke keranjang Anda!
                  </p>
                  <Link href="/">
                    <CustomButton
                      type="button"
                      onClick={() => console.log("Ayo belanja!")}
                      label="Ayo Belanja"
                      variant="primary"
                      size="small"
                      className="mt-4"
                    />
                  </Link>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-4"
                  >
                    {/* Kiri: Gambar dan Info */}
                    <div className="flex flex-1 items-center gap-4">
                      <Image
                        alt={item.name}
                        width={64}
                        height={64}
                        src={item.image}
                        className="rounded object-cover"
                      />
                      <div className="min-w-0">
                        <p className="max-w-[200px] truncate font-medium">
                          {item.name}
                        </p>
                        <p className="text-sm whitespace-nowrap text-gray-500">
                          {item.unit} x Rp{item.price.toLocaleString("id-ID")}
                        </p>
                      </div>
                    </div>

                    {/* Tengah: Tambah Kurang */}
                    <div className="flex w-[110px] shrink-0 items-center justify-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, "decrease")}
                        className="rounded-full bg-gray-200 p-2 hover:bg-gray-300"
                        title="Kurangi Jumlah"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-gray-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 12h12"
                          />
                        </svg>
                      </button>

                      <p className="w-6 text-center font-semibold">
                        {item.quantity}
                      </p>

                      <button
                        onClick={() => updateQuantity(item.id, "increase")}
                        className="rounded-full bg-gray-200 p-2 hover:bg-gray-300"
                        title="Tambah Jumlah"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-gray-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 6v12m6-6H6"
                          />
                        </svg>
                      </button>
                    </div>

                    {/* Kanan: Harga & Delete */}
                    <div className="flex w-[130px] shrink-0 items-center justify-end gap-2">
                      <p className="font-semibold whitespace-nowrap">
                        Rp{(item.quantity * item.price).toLocaleString("id-ID")}
                      </p>
                      <button
                        onClick={() => {
                          setItemToRemove(item.id);
                          setShowRemoveModal(true);
                        }}
                        className="group rounded-full p-1 hover:bg-red-100"
                        title="Hapus item"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-red-500 group-hover:text-red-700"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
          {/* Voucher */}
          <section className="rounded-xl bg-white p-4 shadow-md">
            <h2 className="mb-2 font-bold md:text-lg">Voucher Toko</h2>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Enter voucher code"
                value={voucherCode}
                onChange={(e) => setVoucherCode(e.target.value)}
                className="flex-1 rounded border p-2 focus:ring-2 focus:ring-blue-500"
              />
              <CustomButton
                type="button"
                label={isVoucherApplied ? "Applied ✔" : "Apply"}
                onClick={handleApplyVoucher}
                variant="secondary"
                size="small"
                disabled={isVoucherApplied}
                className="min-w-[100px]"
              />
            </div>
            {errorMessage && (
              <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
            )}

            {isVoucherApplied && (
              <p className="mt-2 text-sm text-green-600">
                Voucher <strong>{dummyVoucher.code}</strong> has been applied
                successfully!
              </p>
            )}
          </section>
        </div>
        <div className="space-y-6">
          {/* Pengiriman */}
          <section className="rounded-xl bg-white p-4 shadow-md">
            <h2 className="mb-2 font-bold md:text-lg">Pilih Jasa Pengiriman</h2>
            <select
              title="Choose Shipping Option"
              className="w-full rounded border p-2 focus:ring-2 focus:ring-blue-500"
              value={selectedShipping}
              onChange={(e) => setSelectedShipping(e.target.value)}
            >
              {shippingOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.name} - Rp{opt.price.toLocaleString("id-ID")}
                </option>
              ))}
            </select>
          </section>

          {/* Voucher Gratis Ongkir */}
          <section className="rounded-xl bg-white p-4 shadow-md">
            <h2 className="mb-2 font-bold md:text-lg">Voucher Ongkir</h2>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Enter voucher code"
                value={shippingVoucherCode}
                onChange={(e) =>
                  setShippingVoucherCode(e.target.value.toUpperCase())
                }
                className="flex-1 rounded border p-2 focus:ring-2 focus:ring-blue-500"
              />
              <CustomButton
                type="button"
                label={isFreeShippingApplied ? "Applied ✔" : "Apply"}
                onClick={handleApplyFreeShippingVoucher}
                variant="secondary"
                size="small"
                disabled={isFreeShippingApplied}
                className="min-w-[100px]"
              />
            </div>
            {isFreeShippingApplied && (
              <p className="mt-2 text-sm text-green-600">
                Free shipping voucher{" "}
                <strong>{dummyFreeShippingVoucher.code}</strong> has been
                applied successfully!
              </p>
            )}
          </section>
        </div>

        <div className="space-y-6">
          {/* Metode Pembayaran */}
          <section className="rounded-xl bg-white p-4 shadow">
            <h2 className="mb-2 font-bold md:text-lg">Metode Pembayaran</h2>
            <select
              title="Pilih Metode Pembayaran"
              className="w-full rounded border p-2"
              value={selectedPayment}
              onChange={(e) => setSelectedPayment(e.target.value)}
            >
              {paymentMethods.map((method) => (
                <option key={method.id} value={method.id}>
                  {method.name}
                </option>
              ))}
            </select>
          </section>

          {/* Rincian Pembayaran */}
          <section className="rounded-xl bg-white p-4 shadow">
            <h2 className="mb-2 text-lg font-bold">Rincian Pembayaran</h2>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Subtotal Produk</span>
                <span>Rp{subtotal.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between">
                <span>Ongkir</span>
                <span>
                  Rp
                  {isFreeShippingApplied
                    ? (
                        shippingOptions.find((s) => s.id === selectedShipping)
                          ?.price ?? 0
                      ).toLocaleString("id-ID")
                    : shippingCost.toLocaleString("id-ID")}
                </span>
              </div>
              {isFreeShippingApplied && (
                <div className="flex justify-between text-green-600">
                  <span>Diskon Ongkir</span>
                  <span>
                    - Rp
                    {(
                      shippingOptions.find((s) => s.id === selectedShipping)
                        ?.price ?? 0
                    ).toLocaleString("id-ID")}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Diskon Voucher</span>
                <span>
                  - Rp
                  {isVoucherApplied
                    ? dummyVoucher.discount.toLocaleString("id-ID")
                    : "0"}
                </span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>Rp{total.toLocaleString("id-ID")}</span>
              </div>
            </div>
          </section>

          {/* Tombol Aksi: Kembali & Buat Pesanan */}
          <div className="mt-6 flex items-center justify-end gap-3">
            {cartItems.length > 0 ? (
              <>
                <CustomButton
                  type="button"
                  label="← Lanjut Belanja"
                  onClick={() => router.push("/")}
                  variant="secondary"
                  size="small"
                  className="py-2"
                />
                <CustomButton
                  type="button"
                  label="Create Order"
                  onClick={handleCreateOrder}
                  variant="primary"
                  size="small"
                  disabled={cartItems.length === 0}
                />
              </>
            ) : (
              <div className="ml-auto">
                <CustomButton
                  type="button"
                  label="Create Order"
                  onClick={handleCreateOrder}
                  variant="primary"
                  size="small"
                  disabled
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal Remove Item */}
      <ConfirmModal
        open={showRemoveModal}
        title="Hapus Produk"
        message="Apakah Anda yakin ingin menghapus produk ini dari keranjang?"
        onConfirm={confirmRemove}
        onCancel={() => setShowRemoveModal(false)}
      />

      {/* Modal Buat Pesanan */}
      <ConfirmModal
        open={showCreateOrderModal}
        title="Konfirmasi Pesanan"
        message="Apakah Anda yakin ingin membuat pesanan ini?"
        onConfirm={() => {
          alert("Pesanan berhasil dibuat!");
          setShowCreateOrderModal(false);
        }}
        onCancel={() => setShowCreateOrderModal(false)}
      />
    </div>
  );
};

export default CheckoutPage;
