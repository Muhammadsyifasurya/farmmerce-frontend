import { atom } from "nanostores";
import { GenericResponse } from "@/app/types/genericResponse";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { customFetch } from "../../composables/CustomFetch";
import { AxiosError } from "axios";

type RegisterForm = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  first_name: string;
  last_name: string;
  gender: string;
  address: string;
  postalCode: string;
  loading?: boolean;
  error?: string | null;
};

type RegisterResponse = {
  // Definisikan struktur data yang kamu terima dari API
  message: string;
  // properti lain yang kamu harapkan dari API
};
export const registerStore = atom<RegisterForm>({
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
  first_name: "",
  last_name: "",
  gender: "",
  address: "",
  postalCode: "",
  loading: false,
  error: null,
});

export const setRegister = (val: Partial<RegisterForm>) => {
  registerStore.set({ ...registerStore.get(), ...val });
};

export const Register = async () => {
  const router = useRouter();

  setRegister({ loading: true });

  const state = registerStore.get();

  try {
    const response = await customFetch<GenericResponse<RegisterResponse>>({
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
      url: "/api/v1/auth/register",
      method: "post",
      data: {
        email: state.email,
        username: state.email,
        password: state.password,
        first_name: state.first_name,
        last_name: state.last_name,
        gender: state.gender || "unknown",
        address: state.address || "-",
        postal_code: parseInt(state.postalCode) || 0,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response?.data) {
      toast.success("Registration successful! Please log in.");
      setRegister({
        // Kosongkan form setelah sukses register
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
        first_name: "",
        last_name: "",
        gender: "",
        address: "",
        postalCode: "",
        loading: false,
        error: null,
      });
      router.push("/login");
    }

    setRegister({ loading: false });
  } catch (error: unknown) {
    let msg = "Registration failed";

    if (error instanceof AxiosError) {
      // Cek apakah error adalah instance dari AxiosError
      msg = error?.response?.data?.message || "Registration failed";
    }
    toast.error(msg);
    setRegister({ error: msg, loading: false });
    console.error(error);
  }
};
