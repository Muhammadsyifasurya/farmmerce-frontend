import { setUser } from "@/app/stores/auth";
import { RegisterProps } from "@/interface/auth";
import { useState } from "react";

export const useRegister = () => {
  const [form, setForm] = useState<RegisterProps>({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    first_name: "",
    last_name: "",
    gender: "",
    address: "",
    postalCode: "",
  });

  const [acceptTerms, setAcceptTerms] = useState(false);

  const setFormRegister = (newForm: Partial<RegisterProps>) => {
    setForm((prevForm) => ({ ...prevForm, ...newForm }));
  };

  return {
    form,
    setFormRegister,
    acceptTerms,
    setAcceptTerms,
    setUser,
  };
};
