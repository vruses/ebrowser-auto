import axios, {
  InternalAxiosRequestConfig,
  AxiosError,
  AxiosInstance,
  AxiosResponse,
} from "axios";
import { ParsedUrlQueryInput } from "querystring";
import axiosRetry from "axios-retry";
import httpConfig from "@/utils/httpConfig";

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
      // 设置五秒超时，超时次数交给axiosRetry控制
      timeout: 5 * 1000,
      maxBodyLength: 5 * 1024 * 1024,
      withCredentials: true,
    });

    axiosRetry(this.axiosInstance, {
      retries: 5,
      shouldResetTimeout: true,
      retryCondition: (error) => {
        // 默认是 network error 或 5xx，这里添加 timeout 错误也重试
        return (
          axiosRetry.isNetworkError(error) ||
          axiosRetry.isRetryableError(error) ||
          error.code === "ECONNABORTED" // 请求超时通常会触发 ECONNABORTED
        );
      },
      retryDelay(retryCount, _error) {
        // 时间线性递增
        return retryCount * 400;
      },
      onRetry: (retryCount, _error, config) => {
        const url = config.url;
        let message = httpConfig.default;
        if (url) {
          if (httpConfig[url]) {
            message = httpConfig[url];
          }
        }
        console.warn(`请求重试中：${message}: ${url}`);
        console.warn(`请求重试数：${retryCount}`);
      },
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
        const message = error.message;
        const status = error.response?.status;
        return Promise.reject(
          JSON.stringify({
            message,
            status,
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
