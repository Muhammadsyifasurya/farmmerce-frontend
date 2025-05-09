import { atom } from "nanostores";
import { customFetch } from "@/app/composables/CustomFetch";
import { GenericResponse } from "@/app/types/genericResponse";
import { Auth, Token, LoginResponse } from "@/app/types/auth";
import { Login } from "@/app/types/login";
import { setToken } from "./token";
import { toast } from "react-toastify";

export const authStore = atom<Auth>({
  id: "",
  password: "",
  loading: false,
});

export const set = (val: any) => {
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
      setToken(data.data);
      toast.success("Log in successful! Please wait...");
    } else throw "";

    set({ loading: false });
  } catch (error: any) {
    let msg = "Login failed";
    if (error?.response) toast.error(msg);
    msg = error?.response?.data?.error?.message_title || "Login failed";
    set({ error: msg, loading: false });
    console.error(error);
  }
};
