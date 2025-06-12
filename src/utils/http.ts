import axios, {
  InternalAxiosRequestConfig,
  AxiosError,
  AxiosInstance,
  AxiosResponse,
} from "axios";
import { ParsedUrlQueryInput } from "querystring";

// 递归config，让子配置对象可选
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
class HttpClient {
  private readonly axiosInstance: AxiosInstance;

  // 传入可选的axios配置对象
  constructor(config: DeepPartial<InternalAxiosRequestConfig> = {}) {
    this.axiosInstance = axios.create({
      ...config,
      timeout: 20 * 1000,
      maxBodyLength: 5 * 1024 * 1024,
      withCredentials: true,
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
        return config;
      },
      (error: AxiosError) => Promise.reject(error)
    );

    // Response interceptor
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        return Promise.reject(
          JSON.stringify({
            error,
            status: error.response?.status,
          })
        );
      }
    );
  }

  public async get<T>(url: string, params?: unknown): Promise<T> {
    const response = await this.axiosInstance.get<T>(url, { params });
    return response.data;
  }

  public async post<T>(url: string, params?: ParsedUrlQueryInput): Promise<T> {
    const response = await this.axiosInstance.post<T>(
      url,
      JSON.stringify(params)
    );
    return response.data;
  }

  public async put<T>(url: string, params?: unknown): Promise<T> {
    const response = await this.axiosInstance.post<T>(
      url,
      JSON.stringify(params)
    );
    return response.data;
  }

  public async delete<T>(url: string, params?: unknown): Promise<T> {
    const response = await this.axiosInstance.post<T>(url, { params });
    return response.data;
  }
}

// Export a singleton instance or create new instances as needed
export default HttpClient;
