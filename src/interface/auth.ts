export interface User {
  id: string;
  email: string;
  name: string;
  role?: "admin" | "user"; // Atau sesuaikan dengan role yang kamu gunakan
  avatarUrl?: string; // Optional field, jika ada foto profil
  createdAt?: string;
  updatedAt?: string;
}

export interface RegisterProps {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  first_name: string;
  last_name: string;
  gender: string;
  address: string;
  postalCode: string;
}
