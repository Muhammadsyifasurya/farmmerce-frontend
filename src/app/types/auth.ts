export interface Token {
  token?: string;
  refreshToken?: string;
}

export interface Auth {
  id: string;
  password: string;
  loading: boolean;
  error?: string;
}

export interface Metadata {
  request_id: string;
}
export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  token_type: "bearer";
}
