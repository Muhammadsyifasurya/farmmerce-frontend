import { fetchData } from "@/app/services/api";
import { setUser } from "@/app/stores/auth";
import { User } from "@/interface/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Fungsi untuk menyimpan data token ke cookies
const setTokenInCookies = (token: string) => {
  const expires = new Date();
  expires.setDate(expires.getDate() + 1); // Token berlaku selama 1 hari
  document.cookie = `auth_token=${token}; path=/; expires=${expires.toUTCString()}`;
};

// Fungsi untuk menyimpan user dan status rememberMe
const saveUserData = (user: User, rememberMe: boolean) => {
  const userData = JSON.stringify(user);
  if (rememberMe) {
    localStorage.setItem("rememberMe", "true");
    localStorage.setItem("user", userData); // Simpan user di localStorage
  } else {
    sessionStorage.setItem("user", userData); // Simpan user di sessionStorage
  }
};

type LoginParams = {
  email: string;
  password: string;
};

export const useLogin = () => {
  const router = useRouter();
  const [form, setForm] = useState<LoginParams>({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState(false);

  const setFormLogin = (newForm: Partial<LoginParams>) => {
    setForm((prevForm) => ({ ...prevForm, ...newForm }));
  };

  const login = async (
    isDummy = false, // flag untuk dummy login
  ) => {
    setLoading(true);
    setError(null);

    try {
      if (isDummy) {
        // Simulasi dummy login
        await new Promise((resolve) => setTimeout(resolve, 1000));

        if (form.email === "anjay@gmail.com" && form.password === "keren123") {
          const dummyUser: User = {
            id: "1",
            name: "Dummy User",
            email: "anjay@gmail.com",
            role: "user",
          };

          setTokenInCookies("dummy-token");
          saveUserData(dummyUser, rememberMe);
          setUser(dummyUser); // Set user in state

          router.push("/");
        } else {
          throw new Error("Invalid email or password.");
        }
      } else {
        // Real API call
        const response = await fetchData({
          endpoint: "/auth/login",
          method: "POST",
          data: { email: form.email, password: form.password },
        });

        const loggedInUser: User = response.user;
        const token = response.token;

        setTokenInCookies(token);
        saveUserData(loggedInUser, rememberMe);
        setUser(loggedInUser);

        router.push("/");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Something went wrong. Please try again.");
      } else {
        setError("An unknown error occurred.");
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    setFormLogin,
    setRememberMe,
    rememberMe,
    loading,
    error,
    setUser,
    login,
  };
};
