import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export const instance = axios.create({
  // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
  // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
  baseURL: "https://api.realworld.io/api",
  // `timeout` 指定请求超时的毫秒数。
  // 如果请求时间超过 `timeout` 的值，则请求会被中断
  timeout: 5_000,
});

//对已声明的模块中的axios中的AxiosInstance进行类型拓展，作用是为拦截器进行服务，使每个请求接收到的数据解析到下一层
declare module 'axios' {
  export interface AxiosInstance {
    <T = any>(config: AxiosRequestConfig): Promise<T>,
    request<T = any>(config: AxiosRequestConfig): Promise<T>,
    get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>,
    delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>,
    head<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>,
    post<T = any>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig
    ): Promise<T>,
    put<T = any>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig
    ): Promise<T>,
    patch<T = any>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig
    ): Promise<T>
  }
}

instance.interceptors.request.use(function (config: AxiosRequestConfig<any>) {
  // 在发送请求之前做些什么
  const token = localStorage.getItem("token");
  if (token) {
    // 这里是重点，验证当前用户
    config.headers!["Authorization"] = `Token ${token}`
  }
  return config;
});

//添加拦截器，解析服务器返回的数据，使传给前端的只有data
instance.interceptors.response.use((response: AxiosResponse<any, any>) => {
  return response.data;
});