import axios, { AxiosRequestConfig, AxiosInstance } from "axios"
import { AuthUser } from "./users/Users.Model"

const initialization = (config: AxiosRequestConfig): AxiosInstance => {
  const axiosInstance = axios.create(config)
  /* Add default headers, interceptors etc.. */
  const token = localStorage.getItem(AuthUser.TOKEN)
  axiosInstance.interceptors.request.use(async (config) => {
    if (token && config.headers) config.headers.Authorization = `Bearer ${token}`

    return config
  })

  return axiosInstance
}

export default initialization
