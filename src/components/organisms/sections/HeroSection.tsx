"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";
import { Product } from "@/interface/products";

interface HeroSectionProps {
  products: Product[];
}

export const HeroSection = ({ products }: HeroSectionProps) => {
  return (
    <section className="relative w-full bg-gradient-to-b from-green-50 via-green-100 to-green-50 py-14 md:py-10">
      <div className="relative z-10 mx-auto flex flex-col-reverse items-center gap-10 px-6 md:flex-row md:items-center md:px-16 xl:gap-16 2xl:px-52">
        {/* Left Side - Promotion / Ad */}
        <div className="flex flex-col items-start text-left md:w-1/2">
          <span className="mb-4 inline-block rounded-full bg-[#bdffb6] px-4 py-2 text-sm font-semibold text-green-600 backdrop-blur-3xl">
            Produk Unggulan 🌾
          </span>
          <h2 className="mb-4 text-3xl font-extrabold text-green-800 drop-shadow-sm md:text-4xl">
            Dukung Petani Lokal
          </h2>
          <p className="mb-6 text-gray-600 md:text-lg">
            Dapatkan produk pertanian segar berkualitas langsung dari tangan
            para petani terbaik. Pilih, sewa lahan, atau beli hasil panen
            favoritmu sekarang juga!
          </p>
          <Link
            href="/"
            className="rounded-full bg-green-600 px-6 py-3 text-white transition hover:bg-green-700 hover:shadow-md"
          >
            Belanja Sekarang
          </Link>
        </div>

        {/* Right Side - Product Featured */}
        <div className="w-full md:w-1/2">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={40}
            slidesPerView={1}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            pagination={{
              clickable: true,
            }}
          >
            {products
              .sort((a, b) => b.rating - a.rating)
              .slice(0, 3)
              .map((product) => (
                <SwiperSlide key={product.id}>
                  <Link href={`/products/${product.id}`}>
                    <div className="group relative h-80 w-full overflow-hidden rounded-3xl transition-all duration-300">
                      {/* Gambar Produk */}
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:brightness-75"
                      />

                      {/* Overlay */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl bg-black/50 opacity-0 backdrop-blur-md transition-opacity duration-500 group-hover:opacity-100">
                        <h3 className="translate-y-4 text-2xl font-bold text-white opacity-0 transition-all delay-200 duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                          {product.name}
                        </h3>
                        <p className="mt-2 mb-4 max-w-xs translate-y-4 text-center text-sm text-gray-200 opacity-0 transition-all delay-300 duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                          {product.description}
                        </p>
                        <button className="mt-4 scale-95 transform cursor-pointer rounded-full bg-green-600 px-6 py-2 text-white transition group-hover:scale-100 hover:bg-green-700">
                          Detail
                        </button>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};
