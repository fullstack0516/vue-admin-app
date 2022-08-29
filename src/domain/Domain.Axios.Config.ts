import { AxiosRequestConfig } from "axios"

export const baseUrl = (hostname: string) => {
  const host = (import.meta.env.VITE_APP_ENDPOINT || "").toString()

  switch (hostname) {
    case "127.0.0.1":
      return host
    case "localhost":
      return host
    case "artemisdigital.io":
      return host
    default:
      throw new Error(`${host} api domain is not supported`)
  }
}

export const axiosRequestConfiguration: AxiosRequestConfig = {
  baseURL: baseUrl(process.env.NODE_ENV === "test" ? "localhost" : window.location.hostname),
  responseType: "json",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
}
