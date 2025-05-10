"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import { UserProfile } from "@/app/types/auth";
import {
  BadgeCheck,
  LogOut,
  MapPin,
  Pencil,
  Store,
  ShoppingCart,
  Trash2,
} from "lucide-react";
import EditProfileModal from "@/components/popups/EditProfileModal";

const ProfilePage = () => {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isEditOpen, setEditOpen] = useState(false);
  const [isStoreOpen, setStoreOpen] = useState(false);

  // Dummy data for order history (Replace with API call if necessary)
  const [orderHistory, setOrderHistory] = useState([
    { orderId: "ORD123", date: "2025-05-10", total: 150, status: "Delivered" },
    { orderId: "ORD124", date: "2025-04-22", total: 90, status: "Shipped" },
    { orderId: "ORD125", date: "2025-03-18", total: 200, status: "Pending" },
  ]);

  const handleOpenStore = () => {
    setStoreOpen(true);
  };

  const handleCloseStore = () => {
    setStoreOpen(false);
  };

  useEffect(() => {
    const userString = sessionStorage.getItem("user");
    if (!userString) {
      toast.warning("You must login first!");
      router.push("/login");
    } else {
      const userData = JSON.parse(userString);
      setUser(userData);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("rememberMe");
    sessionStorage.removeItem("user");
    localStorage.removeItem("auth_token");
    router.push("/login");
  };

  const handleDeleteOrder = (orderId: string) => {
    // Filter out the order to delete from the history
    setOrderHistory((prevHistory) =>
      prevHistory.filter((order) => order.orderId !== orderId),
    );
    toast.success("Order deleted successfully!");
  };

  const getRoleLabel = (role: string | number | undefined) => {
    switch (String(role)) {
      case " 1":
        return "Customer";
      case " 2":
        return "Seller";
      case " 3":
        return "Admin";
      default:
        return "User";
    }
  };

  if (!user) return null;

  const roleLabel = getRoleLabel(user.role);

  return (
    <section className="mt-[70px] flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10">
      <EditProfileModal
        isOpen={isEditOpen}
        onClose={() => setEditOpen(false)}
        onUpdate={() => {
          /* refresh profile if needed */
        }}
      />
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="w-full max-w-4xl rounded-2xl bg-white shadow-lg">
        <div className="flex flex-col items-center justify-between gap-6 p-8 md:flex-row">
          <div className="flex flex-col items-center gap-4 text-center md:flex-row md:text-left">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt="Avatar"
                className="h-32 w-32 rounded-full border-4 border-green-500 object-cover shadow-md"
              />
            ) : (
              <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gray-300 text-4xl font-bold text-white shadow-md">
                {user.username[0]?.toUpperCase()}
              </div>
            )}
            <div>
              <h2 className="text-3xl font-semibold text-gray-800">
                {user.first_name} {user.last_name}
              </h2>
              <p className="text-gray-600">{user.email}</p>
              <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
                <BadgeCheck size={16} /> {roleLabel}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <button
              onClick={() => setEditOpen(true)}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-white shadow-md hover:bg-blue-700"
            >
              <Pencil size={16} /> Edit Profile
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-lg bg-red-600 px-5 py-3 text-white shadow-md hover:bg-red-700"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>

        <hr className="border-t border-gray-200" />

        <div className="grid grid-cols-1 gap-6 p-8 md:grid-cols-2">
          <ProfileField label="Username" value={user.username} />
          <ProfileField label="Gender" value={user.gender || "Not set"} />
          <ProfileField
            label="Address"
            value={user.address || "No address provided"}
            icon={<MapPin className="h-4 w-4 text-gray-400" />}
          />
          <ProfileField
            label="Postal Code"
            value={user.postal_code?.toString() || "N/A"}
          />
        </div>

        {/* History Belanja */}
        <div className="border-t border-gray-200 px-8 py-6">
          <h3 className="mb-4 text-xl font-semibold text-gray-700">
            Riwayat Belanja
          </h3>
          {/* History Belanja */}
          <div className="border-t border-gray-200 px-8 py-6">
            <div className="max-h-[400px] space-y-4 overflow-y-auto">
              {orderHistory.map((order) => (
                <div
                  key={order.orderId}
                  className="flex items-center justify-between border-b border-gray-200 py-2"
                >
                  <div className="flex items-center">
                    <ShoppingCart size={18} className="text-gray-600" />
                    <span className="ml-3 font-semibold text-gray-800">
                      Order ID: {order.orderId}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-sm text-gray-500">{order.date}</p>
                      <p className="text-lg font-semibold text-gray-800">
                        Rp {order.total}
                      </p>
                      <span
                        className={`mt-1 inline-block rounded-full px-3 py-1 text-xs ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <button
                      title="keren"
                      onClick={() => handleDeleteOrder(order.orderId)}
                      className="flex items-center justify-center text-red-600 hover:text-red-800"
                      style={{
                        padding: "4px",
                        borderRadius: "50%",
                        border: "none",
                        background: "transparent",
                      }}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {roleLabel === "Customer" && (
          <div className="border-t border-gray-200 px-8 py-6 text-center">
            <h3 className="mb-4 text-xl font-semibold text-gray-700">
              Ingin Jadi Penjual?
            </h3>
            <button
              onClick={handleOpenStore}
              className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-6 py-3 text-white shadow-md hover:bg-green-700"
            >
              <Store size={16} /> Buka Toko Sekarang
            </button>
          </div>
        )}
      </div>

      {/* Modal for opening store */}
      {isStoreOpen && (
        <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
          <div className="w-full max-w-lg rounded-lg bg-white p-8 shadow-xl">
            <h2 className="text-2xl font-bold text-gray-800">Buka Toko</h2>
            <p className="mt-2 text-gray-600">
              Untuk membuka toko, lengkapi form berikut:
            </p>
            <div className="mt-6">
              <button
                onClick={handleCloseStore}
                className="w-full rounded-lg bg-green-600 py-3 text-white hover:bg-green-700"
              >
                Tutup Toko
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

const ProfileField = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
}) => (
  <div className="flex flex-col gap-2">
    <span className="text-sm font-semibold text-gray-500">{label}</span>
    <div className="flex items-center gap-2 text-gray-800">
      {icon}
      <span className="text-lg">{value}</span>
    </div>
  </div>
);

export default ProfilePage;
