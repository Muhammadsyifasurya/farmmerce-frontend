// components/CartModal.tsx

import {
  $cartItems,
  removeFromCart,
  updateQuantity,
} from "@/app/stores/products/cartStores";
import Image from "next/image";
import CustomButton from "../ui/CustomButton";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
  const cartItems = $cartItems.get(); // Ambil items dari store
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement | null>(null);
  // Close the modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose(); // Close the modal when click is outside
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Modal hanya ditampilkan jika isOpen true
  if (!isOpen) return null;

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black backdrop-blur-xl transition-all duration-300 ease-in-out ${
          isOpen ? "opacity-20" : "opacity-0"
        }`}
      />
      <div
        ref={modalRef}
        className="fixed top-[70px] left-1/2 z-50 mt-3 w-full max-w-sm -translate-x-1/2 rounded-xl border border-gray-200 bg-white/80 shadow-2xl backdrop-blur-sm transition-all duration-300 sm:right-4 sm:left-auto sm:translate-x-0 md:right-10 lg:right-20 2xl:right-52"
      >
        <div className="p-4 sm:p-5">
          {/* Header */}
          <div className="flex items-center justify-between border-b pb-3">
            <h2 className="text-lg font-semibold text-gray-800 sm:text-xl">
              🛒 Your Cart
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 transition duration-200 hover:text-red-500"
            >
              <span className="text-2xl leading-none">&times;</span>
            </button>
          </div>

          {/* Cart Items */}
          <div className="mt-4 max-h-72 space-y-3 overflow-y-auto pr-1">
            {cartItems.length === 0 ? (
              <p className="text-center text-gray-500 italic">
                Your cart is empty
              </p>
            ) : (
              cartItems.slice(0, 5).map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-2 border-b pb-2"
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src={item.image}
                      width={50}
                      height={50}
                      alt={item.name}
                      className="rounded-lg border"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        Rp {item.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-black">
                    <button
                      className="rounded-md bg-gray-200 px-2 py-1 text-xs transition hover:bg-gray-300"
                      onClick={() => updateQuantity(item.id, "decrease")}
                      disabled={item.quantity === 1}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="rounded-md bg-gray-200 px-2 py-1 text-xs transition hover:bg-gray-300"
                      onClick={() => updateQuantity(item.id, "increase")}
                    >
                      +
                    </button>
                    <button
                      className="ml-2 text-xs text-red-400 transition hover:text-red-600"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
            {cartItems.length > 5 && (
              <p className="mt-2 text-center text-sm text-gray-400 italic">
                ...and more items
              </p>
            )}
          </div>

          {/* Footer */}
          <div className="mt-5 flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-base font-semibold text-gray-800 sm:text-lg">
              Total:{" "}
              <span className="text-green-600">
                Rp{" "}
                {cartItems
                  .reduce(
                    (total, item) => total + item.price * item.quantity,
                    0,
                  )
                  .toLocaleString()}
              </span>
            </p>
            <CustomButton
              type="button"
              label="Checkout"
              variant="primary"
              size="small"
              onClick={() => router.push("/checkout")}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CartModal;
