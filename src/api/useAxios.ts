"use client";
import axios from "axios";
import useAuthStore from "@/lib/store/auth";
// import useAuthStore from 'context/auth';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

type CustomClient<T> = (data: {
  url: string;
  method: "get" | "post" | "put" | "delete" | "patch";
  params?: Record<string, any>;
  headers?: Record<string, any>;
  data?: BodyType<unknown>;
  signal?: AbortSignal;
}) => Promise<T>;

export const useAxios = <T>(): CustomClient<T> => {
  // (localStorage && localStorage?.getItem("accessToken"));

  return async ({ url, method, params, data, headers }) => {
    const token = localStorage.getItem("accessToken");
    const authHeaders = token
      ? { ...headers, Authorization: `Bearer ${token}` }
      : { ...headers };

    const fetchUrl = `${baseURL}${url}`;

    try {
      const response = await axios({
        method,
        url: fetchUrl,
        params,
        headers: { ...authHeaders },
        data: data ?? undefined,
      });

      return response.data;
    } catch (e) {
      throw e;
    }
  };
};

// add a second `options` argument here if you want to pass extra options to each generated query
// export const useAxios=<T>():CustomCient<T>=>{
//   return
// } = <T>(
//   config: AxiosRequestConfig,
//   options?: AxiosRequestConfig
// ): Promise<T> => {
//   const source = Axios.CancelToken.source();
//   const promise = AXIOS_INSTANCE({
//     ...config,
//     ...options,
//     cancelToken: source.token,
//   }).then(({ data }) => data);

//   // @ts-ignore
//   promise.cancel = () => {
//     source.cancel('Query was cancelled');
//   };

//   return promise;
// };

export default useAxios;

export type ErrorType<ErrorData> = ErrorData;

export type BodyType<BodyData> = BodyData & { headers?: any };
