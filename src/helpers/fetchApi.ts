import axios from 'axios'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface ApiResponse<T> {
  data: T
  status: number
  statusText: string
}

export async function fetchApi<T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  try {
    const response: AxiosResponse<T> = await axios.get<T>(url, config)
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText
    }
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      console.error('Axios Error:', err.response?.data || err.message)
      throw new Error(err.response?.data?.message || 'API Error')
    } else if (err instanceof Error) {
      console.error('General Error:', err.message)
      throw new Error(err.message)
    } else {
      console.error('Unknown Error:', err)
      throw new Error('An unknown error occurred')
    }
  }
}
