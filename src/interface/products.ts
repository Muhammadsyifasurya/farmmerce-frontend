// export interface Product {
//   id: string;
//   name: string;
//   image: string;
//   price: number;
//   description: string;
//   category: string;
//   stock: number;
//   rating: number;
//   duration?: string;
//   unit?: string;
// }

export interface Store {
  store_id: string;
  owner_id: string; // ← relasi ke User
  name: string;
  logo: string;
  description?: string;
}

export interface Product {
  id: string;
  store: Store;
  name: string;
  image: string;
  price: number;
  description: string;
  category: string;
  stock: number;
  rating: number; // rata-rata rating dari Review[]
  duration?: string;
  unit?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Filters {
  category: string;
  price: string;
  rating: string;
  stock: string;
}

// types.ts

export interface Address {
  name: string;
  phone: string;
  address: string;
}

export interface Voucher {
  code: string;
  discount: number;
  minimumPurchase: number;
}

export interface FreeShippingVoucher {
  code: string;
  freeShipping: boolean;
  minimumPurchase: number;
}

export interface ShippingOption {
  id: string;
  name: string;
  price: number;
}

export interface PaymentMethod {
  id: string;
  name: string;
}
