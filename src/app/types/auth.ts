export interface Token {
  token?: string;
  refreshToken?: string;
}

export interface Auth {
  id: string;
  password: string;
  loading: boolean;
  error?: string;
  rememberMe?: boolean;
}

export interface Metadata {
  request_id: string;
}
export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  token_type: "bearer";
}

// types/user.ts
export interface UserProfile {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  address: string;
  postal_code: number;
  avatar: string | null;
  role: number;
  created_at: string;
  updated_at: string;
}
