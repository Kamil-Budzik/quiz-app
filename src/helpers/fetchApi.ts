import axios from 'axios'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'

const API_URL = 'https://opentdb.com/api.php'

export interface ApiResponse<T> {
  data: T
  status: number
  statusText: string
}

export async function fetchApi<T>(config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
  try {
    const response: AxiosResponse<T> = await axios.request<T>({
      url: API_URL,
      ...config
    })
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText
    }
  } catch (err: unknown) {
    return handleApiError(err)
  }
}

function handleApiError(error: unknown): never {
  if (axios.isAxiosError(error)) {
    console.error('Axios Error:', error.response?.data || error.message)
    const message = error.response?.data?.message || 'API Error'
    throw new Error(message)
  } else if (error instanceof Error) {
    console.error('General Error:', error.message)
    throw new Error(error.message)
  } else {
    console.error('Unknown Error:', error)
    throw new Error('An unknown error occurred')
  }
}
