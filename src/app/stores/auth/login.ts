import { atom } from "nanostores";
import { customFetch } from "@/app/composables/CustomFetch";
import { GenericResponse } from "@/app/types/genericResponse";
import { Auth, LoginResponse } from "@/app/types/auth";
import { Login } from "@/app/types/login";
import { setToken } from "./token";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

export const authStore = atom<Auth>({
  id: "",
  password: "",
  loading: false,
  rememberMe: false,
});

export const set = (val: Partial<Auth>) => {
  authStore.set({ ...authStore.get(), ...val });
};

export const login = async () => {
  set({ loading: true });
  try {
    const response = await customFetch<GenericResponse<LoginResponse>>({
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
      url: "/api/v1/auth/login",
      method: "post",
      data: {
        email: authStore.get().id,
        password: authStore.get().password,
      } as Login,
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = response;

    if (data) {
      // Simpan token di localStorage jika rememberMe aktif
      const tokenData = data.data;
      if (authStore.get().rememberMe) {
        localStorage.setItem("auth_token", JSON.stringify(tokenData));
      }

      setToken(tokenData);
      toast.success("Log in successful! Please wait...");
    } else throw "";

    set({ loading: false });
  } catch (error: unknown) {
    let msg = "Login failed";
    if (error instanceof AxiosError) {
      // Cek jika error merupakan instance dari AxiosError dan memiliki response
      if (error.response) {
        msg = error.response.data?.error?.message_title || "Login failed";
        toast.error(msg);
      }
    } else if (error instanceof Error) {
      // Tangani error umum lainnya
      msg = error.message;
    }
    set({ error: msg, loading: false });
    console.error(error);
  }
};

export const restoreSession = () => {
  const tokenString = localStorage.getItem("auth_token");
  if (tokenString) {
    const tokenData = JSON.parse(tokenString);
    setToken(tokenData); // gunakan kembali token
    toast.info("Session restored from previous login.");
  }
};
