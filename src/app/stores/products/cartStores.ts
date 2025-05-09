import { CartItem } from "@/interface/products";
import { atom, computed } from "nanostores";

export const $cartItems = atom<CartItem[]>([]);

export const $cartTotalItems = computed($cartItems, (items) =>
  items.reduce((total, item) => total + item.quantity, 0),
);

export const addToCart = (item: CartItem) => {
  const prev = $cartItems.get(); // Ambil cart sebelumnya
  const existing = prev.find((i) => i.id === item.id);
  if (existing) {
    $cartItems.set(
      prev.map((i) =>
        i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i,
      ),
    );
  } else {
    $cartItems.set([...prev, item]);
  }
};

export const removeFromCart = (id: string) => {
  const prev = $cartItems.get();
  $cartItems.set(prev.filter((item) => item.id !== id));
};

export const clearCart = () => {
  $cartItems.set([]);
};

export const updateQuantity = (
  itemId: string,
  action: "increase" | "decrease",
) => {
  const prev = $cartItems.get();
  $cartItems.set(
    prev.map((item) => {
      if (item.id === itemId) {
        if (action === "increase") {
          return { ...item, quantity: item.quantity + 1 };
        }
        if (action === "decrease" && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
      }
      return item;
    }),
  );
};
