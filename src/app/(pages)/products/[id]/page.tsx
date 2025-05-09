"use client";

import { addToCart } from "@/app/stores/products/cartStores";
import { CardItem } from "@/components/ui/CardItem";
import CustomButton from "@/components/ui/CustomButton";
import RatingStars from "@/components/ui/RatingStars";
import { products } from "@/data/dummyData";
import { ChevronRight, Clock, CreditCard, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use, useState } from "react";

type Params = {
  id: string;
};

type ProductDetailPageProps = {
  params: Promise<Params>;
};

const ProductDetail = ({ params }: ProductDetailPageProps) => {
  const { id } = use(params);
  const product = products.find((product) => product.id === id);

  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(product?.image);
  const router = useRouter();

  if (!product) {
    return <div>Produk tidak ditemukan!</div>;
  }

  const totalPrice = product.price * quantity;

  // Dummy gambar tambahan (bisa diganti dengan gambar berbeda)
  const additionalImages = [
    product.image,
    product.image,
    product.image,
    product.image,
  ];

  return (
    <div className="xl: px-4 pt-24 sm:px-8 md:px-12 lg:px-20 xl:mx-[50px] 2xl:px-40">
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
          href="#"
          className="flex items-center gap-1 text-green-700 transition hover:underline"
        >
          <span className="font-medium">All Product</span>
        </Link>

        <ChevronRight className="mx-1 h-4 w-4 text-gray-400" />

        <span className="font-semibold text-gray-800">{product.name}</span>
      </nav>

      <section className="mx-auto flex max-w-6xl flex-col gap-10 px-4 md:flex-row">
        {/* Left - Image Gallery */}
        <div className="w-full md:w-1/2">
          <div className="overflow-hidden rounded-2xl shadow-md">
            <img
              src={mainImage}
              alt={product.name}
              className="h-60 w-full object-cover transition-transform duration-300 hover:scale-105 sm:h-80 md:h-96"
            />
          </div>

          <div className="mt-4 flex flex-wrap gap-2 sm:gap-3">
            {additionalImages.slice(0, 4).map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                onClick={() => setMainImage(img)}
                className={`h-16 w-16 cursor-pointer rounded-xl border-2 object-cover transition-transform duration-300 hover:scale-105 sm:h-20 sm:w-20 ${
                  mainImage === img ? "border-green-600" : "border-transparent"
                }`}
              />
            ))}
          </div>
        </div>
        {/* Right - Product Info */}
        <div className="w-full space-y-6 md:w-1/2">
          <h2 className="text-3xl font-extrabold text-green-800 transition-colors duration-300 hover:text-green-700 sm:text-4xl">
            {product.name}
          </h2>
          <p className="text-sm font-semibold text-gray-500">
            {product.category}
          </p>

          {/* Rating */}
          <div className="flex items-center space-x-2">
            <RatingStars rating={product.rating} />
          </div>

          <p className="text-lg text-gray-700 sm:text-xl">
            {product.description}
          </p>

          {/* Info Toko */}
          <div className="mt-4 flex items-center space-x-4">
            <img
              src={product.store?.logo}
              alt={product.store?.name}
              className="h-12 w-12 rounded-full border-2 border-green-500 transition-transform duration-300 hover:scale-110"
            />
            <div className="text-sm font-medium text-gray-600">
              <span className="font-semibold">{product.store?.name}</span>
              <span className="flex items-center gap-2 text-sm text-gray-600">
                <Clock size={16} className="text-gray-800" />
                <span className="text-gray-800">± 2 Jam</span>
                <p className="text-gray-500">pesanan diproses</p>
              </span>
            </div>

            <button className="ml-4 rounded-full border-2 border-green-600 px-6 py-1 text-sm font-medium text-green-600 transition-all duration-300 hover:border-green-700 hover:bg-green-600 hover:text-white">
              Follow
            </button>
          </div>

          {/* Stock Information */}
          <div className="mt-3 flex items-center text-sm text-gray-600">
            {product.stock && product.stock > 0 ? (
              <span className="font-medium text-green-600">
                Stok Tersedia: {product.stock} {product.unit}
              </span>
            ) : (
              <span className="font-medium text-red-600">Stok Habis</span>
            )}
          </div>

          {/* Quantity Selector */}
          <div className="mt-4 flex items-center gap-2 text-lg font-medium">
            <label className="text-gray-600">Qty:</label>
            <div className="inline-flex items-center justify-center gap-3 rounded-full bg-gray-100 px-5 py-1 shadow-md">
              <button
                className="text-xl text-gray-600 transition-colors duration-200 hover:text-green-700"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                -
              </button>
              <span className="text-lg font-semibold">{quantity}</span>
              <button
                className="text-xl text-gray-600 transition-colors duration-200 hover:text-green-700"
                onClick={() => setQuantity((q) => q + 1)}
              >
                +
              </button>
            </div>
          </div>

          {/* Price */}
          <div className="mt-4 flex justify-end text-3xl font-bold text-green-700">
            Rp {totalPrice.toLocaleString()}
          </div>

          {/* Buttons */}
          <div className="mt-6 flex justify-end gap-3">
            <CustomButton
              type="button"
              icon={<ShoppingCart size={16} />}
              label="Add to Cart"
              variant="primary"
              size="small"
              onClick={() => {
                const cartItem = {
                  ...product,
                  quantity: quantity,
                };
                addToCart(cartItem); // Menambahkan item ke cart
              }}
              className="flex items-center rounded-full bg-green-600 px-6 py-3 text-white transition-all duration-300 hover:bg-green-700"
            />

            <CustomButton
              type="button"
              icon={<CreditCard size={16} />}
              label="Checkout Now"
              variant="secondary"
              size="small"
              onClick={() => {
                const cartItem = {
                  ...product,
                  quantity: quantity,
                };
                addToCart(cartItem); // Menambahkan item ke cart terlebih dahulu
                router.push("/checkout"); // Arahkan ke halaman checkout
              }}
              className="flex items-center rounded-full bg-gray-800 px-6 py-3 text-white transition-all duration-300 hover:bg-gray-900"
            />
          </div>
        </div>
      </section>

      <section className="mt-16 text-center">
        <h3 className="mb-8 text-2xl font-semibold text-gray-800">
          Shop Similar
        </h3>

        {products.filter(
          (p) => p.id !== product.id && p.category === product.category,
        ).length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 animate-bounce text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 3h18M9 3v18m6-18v18M4 21h16"
              />
            </svg>
            <p className="text-lg font-medium">
              Yah, produk serupa belum tersedia 😥
            </p>
            <p className="text-sm text-gray-400">
              Coba cek kategori lain, siapa tahu ada yang cocok!
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <div className="flex w-max gap-6 pb-6">
              {products
                .filter(
                  (p) => p.id !== product.id && p.category === product.category,
                )
                .map((item) => (
                  <CardItem key={item.id} data={item} />
                ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default ProductDetail;
