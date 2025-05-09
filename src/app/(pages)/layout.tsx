"use client";
import FooterPage from "@/components/organisms/layouts/footer";
import Header from "@/components/organisms/layouts/header";
import { useEffect, useState } from "react";
import { setUser } from "../stores/auth";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/organisms/layouts/sidebar";

export default function PageLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const rememberMe = localStorage.getItem("rememberMe") === "true";
    const savedUser = rememberMe
      ? localStorage.getItem("user")
      : sessionStorage.getItem("user");

    if (!savedUser) {
      router.replace("/login");
      document.cookie = "auth_token=; max-age=0; path=/";
      setLoading(false); // Set loading false hanya jika tidak ada user
      return;
    }

    try {
      const user = JSON.parse(savedUser);
      setUser(user);
    } catch (error) {
      console.error("Error parsing user data from storage", error);
    }

    setLoading(false);
  }, [router]);

  if (loading) {
    return null;
  }

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen); // Toggle sidebar open/close
  };

  return (
    <section>
      {isSidebarOpen && (
        <div
          className={`fixed inset-0 z-50 bg-black backdrop-blur-lg transition-all duration-300 ease-in-out ${
            isSidebarOpen ? "opacity-60" : "opacity-0"
          }`}
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      <div>{children}</div>
      <FooterPage />
    </section>
  );
}
