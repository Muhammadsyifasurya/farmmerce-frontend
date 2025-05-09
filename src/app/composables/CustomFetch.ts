import axios, { AxiosRequestConfig } from "axios";

type HTTPMethod =
  | "get"
  | "head"
  | "patch"
  | "post"
  | "put"
  | "delete"
  | "connect"
  | "options"
  | "trace";

interface OptionsFetch {
  url: string;
  method: HTTPMethod;
  authorization?: string;
  params?: object;
  data?: object;
  headers?: object;
  baseURL?: string;
  encodedBody?: { [key: string]: string };
}

export const customFetch = async <T>(options: OptionsFetch): Promise<T> => {
  const {
    url,
    method,
    authorization,
    params,
    data,
    headers,
    baseURL = process.env.VITE_API_BASE_URL,
    encodedBody,
  } = options;

  const config: AxiosRequestConfig = {
    url,
    method,
    params,
    data,
    headers: {
      Authorization: authorization,
      ...headers,
    },
    baseURL,
  };

  if (encodedBody) {
    config.transformRequest = () => new URLSearchParams(encodedBody).toString();
  }

  const response = await axios.request<T>(config);

  return response.data;
};
