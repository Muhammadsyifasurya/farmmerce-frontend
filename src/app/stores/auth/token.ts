import { atom } from "nanostores";
import { Token, UserProfile } from "@/app/types/auth";
import { ExchangeToken } from "@/app/types/exchangesToken";
import { jwtDecode, type JwtPayload } from "jwt-decode";
import { customFetch } from "@/app/composables/CustomFetch";
import { GenericResponse } from "@/app/types/genericResponse";

export const tokenStore = atom<Token>({
  token: "",
  refreshToken: "",
});

export const set = (val: Partial<Token>) => {
  tokenStore.set({ ...tokenStore.get(), ...val });
};

export const setToken = async (data: ExchangeToken) => {
  if (!data.access_token) {
    return;
  }
  if (data.access_token == tokenStore.get().token) {
    return;
  }

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

  // Cek apakah user data sudah ada di sessionStorage, jika belum, simpan data sementara
  if (!sessionStorage.getItem("user")) {
    sessionStorage.setItem("user", JSON.stringify(userData));
  }

  // Fetch profil user dengan credential (id atau username)
  try {
    const userResponse = await customFetch<GenericResponse<UserProfile>>({
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
      url: `/api/v1/users/${id}`, // Bisa ganti 'id' dengan 'username' atau credential lain sesuai kebutuhan
      method: "get",
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
      },
    });

    if (userResponse?.data) {
      const updatedUserData = userResponse?.data || {};

      // Gabungkan role yang sudah ada di userResponse dengan yang ada di userData sebelumnya
      const mergedUserData = {
        ...updatedUserData, // Tambahkan data lain dari API
        role: userData.role,
      };
      console.log(mergedUserData);
      sessionStorage.setItem("user", JSON.stringify(mergedUserData));
    }
  } catch (error) {
    console.error("Failed to fetch user profile", error);
  }
};
