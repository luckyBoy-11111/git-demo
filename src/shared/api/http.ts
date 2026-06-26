import axios from 'axios'
import type { InternalAxiosRequestConfig } from 'axios'
import { endLoading, startLoading } from '../hooks/useGlobalLoading'
import { showError } from '../utils/tip'
import { API_BASE_URL } from './endpoints'

declare module 'axios' {
  interface AxiosRequestConfig {
    showLoading?: boolean
    loadingText?: string
  }
}

type InternalAppRequestConfig = InternalAxiosRequestConfig & {
  showLoading?: boolean
  loadingText?: string
}

export const http = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
})

http.interceptors.request.use((config: InternalAppRequestConfig) => {
  if (config.showLoading) {
    startLoading({ text: config.loadingText || '请求处理中...' })
  }
  return config
})

http.interceptors.response.use(
  (response) => {
    const config = response.config as InternalAppRequestConfig
    if (config.showLoading) {
      endLoading()
    }
    return response.data
  },
  (error) => {
    const config = error.config as InternalAppRequestConfig | undefined
    if (config?.showLoading) {
      endLoading()
    }
    showError(error?.message || '请求失败，请稍后重试')
    return Promise.reject(error)
  },
)
