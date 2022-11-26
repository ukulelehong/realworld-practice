import axios, { AxiosRequestConfig } from "axios";

export const instance = axios.create({
  // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
  // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
  baseURL: "https://api.realworld.io/api",
  // `timeout` 指定请求超时的毫秒数。
  // 如果请求时间超过 `timeout` 的值，则请求会被中断
  timeout: 5_000,
});

instance.interceptors.request.use(function (config: AxiosRequestConfig<any>) {
  // 在发送请求之前做些什么
  const token = localStorage.getItem("token");
  if (token) {
    // 这里是重点，验证当前用户
    config.headers!["Authorization"] = `Token ${token}`
  }
  return config;
});
