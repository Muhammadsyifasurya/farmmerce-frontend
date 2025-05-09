import { atom } from "nanostores";
import { useAuthFetch } from "@/app/composables/CustomFetch";
import { GenericResponse } from "@/app/types/genericResponse";
import { ExchangeToken } from "@/app/types/exchangesToken";
import { Auth, Token, LoginResponse } from "@/app/types/auth";
import { Login } from "@/app/types/login";

export const authStore = atom<Auth>({
  id: "",
  password: "",
  loading: false,
});

export const tokenStore = atom<Token>({
  token: "",
  refreshToken: "",
  data: {},
});

export const set = (val: any) => {
  authStore.set({ ...authStore.get(), ...val });
};

export const setToken = (data: ExchangeToken) => {
  if (!data.access_token) {
    return;
  }

  if (data.access_token == tokenStore.get().token) {
    return;
  }

  const dataToken = tokenStore.get().data;
  console.log("setToken", data);
  const token = {
    accessToken: data.access_token,
    refreshToken: data?.refresh_token,
    data: dataToken,
  };
  localStorage.setItem("token", JSON.stringify(token));
  tokenStore.set(token);
  window.parent.postMessage(
    {
      func: "setToken",
      token: data.access_token,
      refreshToken: data?.refresh_token,
    },
    "*",
  );
};

export const login = async () => {
  set({ loading: true });
  try {
    const response = await useAuthFetch<GenericResponse<LoginResponse>>({
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
      url: "/api/v1/auth/login",
      method: "post",
      data: {
        email: authStore.get().id,
        password: authStore.get().password,
      } as Login,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const data = response;

    if (data?.data.access_token) {
      tokenStore.set({ data: response });
      setToken(data.data);
    } else throw "";

    set({ loading: false });
  } catch (error: any) {
    let msg = "Login failed";
    if (error?.response)
      msg = error?.response?.data?.error?.message_title || "Login failed";

    set({ error: msg, loading: false });
    console.error(error);
  }
};
