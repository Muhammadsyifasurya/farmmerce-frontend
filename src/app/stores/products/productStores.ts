import { atom } from "nanostores";
import { useAuthFetch } from "../../composables/CustomFetch";

// Tipe data untuk produk
export type Product = {
  name: string;
  description: string;
  price: number;
  stock: number;
  rating: number;
  image: string;
};

// Store untuk produk, status loading, dan error
export const productStore = atom<Product[]>([]);
export const isLoadingProducts = atom<boolean>(false);
export const productError = atom<string | null>(null);

// Fungsi untuk fetch data produk
export const fetchProducts = async () => {
  // Set status loading menjadi true sebelum fetch
  isLoadingProducts.set(true);
  productError.set(null); // Reset error sebelumnya

  try {
    // Panggil API untuk mengambil data produk
    const data = await useAuthFetch<{ data: Product[] }>({
      url: "/api/v1/auth/products", // endpoint produk
      method: "get",
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Base URL
    });

    // Set data produk ke store
    productStore.set(data.data);
  } catch (error: any) {
    // Set error jika gagal
    productError.set(error.message || "Gagal mengambil data produk");
  } finally {
    // Set status loading ke false setelah fetch selesai
    isLoadingProducts.set(false);
  }
};
