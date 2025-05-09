import { atom } from "nanostores";
import { Token } from "@/app/types/auth";
import { ExchangeToken } from "@/app/types/exchangesToken";
import { jwtDecode, type JwtPayload } from "jwt-decode";

export const tokenStore = atom<Token>({
  token: "",
  refreshToken: "",
});

export const set = (val: any) => {
  tokenStore.set({ ...tokenStore.get(), ...val });
};

export const setToken = (data: ExchangeToken) => {
  if (!data.access_token) {
    return;
  }

  if (data.access_token == tokenStore.get().token) {
    return;
  }

  const dataToken = tokenStore.get().token;
  console.log("setToken", data);
  const token = {
    accessToken: data.access_token,
    refreshToken: data?.refresh_token,
    token_type: data?.token_type,
  };

  const decoded = jwtDecode<JwtPayload>(token.accessToken);
  const sub = decoded?.sub?.split(",") || [];
  const [id, username, email, role, name] = sub;

  if (!decoded) {
    return;
  }
  const userData = {
    id: id,
    username: username,
    name: name,
    email: email,
    role: role,
  };
  console.log("cugud ", userData);
  localStorage.setItem("token", JSON.stringify(token.accessToken));
  tokenStore.set(token);
  const expires = new Date();
  expires.setDate(expires.getDate() + 1);
  document.cookie = `auth_token=${decoded.sub}; path=/; expires=${decoded.exp}`;
  // localStorage.setItem("rememberMe", "true");
  // localStorage.setItem("user", JSON.stringify(dummyUser));
  sessionStorage.setItem("user", JSON.stringify(userData));
};
