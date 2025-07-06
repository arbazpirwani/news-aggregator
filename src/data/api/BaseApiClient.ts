import axios from 'axios';
import type {AxiosInstance} from 'axios';
import {axiosConfig} from "../../config/axiosConfig";

/**
 * Base API client with common functionality
 */
export abstract class BaseApiClient {
    protected client: AxiosInstance;

    protected constructor(baseURL: string, protected apiKey: string) {

        this.client = axios.create({baseURL, ...axiosConfig});

        this.client.interceptors.request.use(
            (config) => {
                console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
                return config;
            },
            (error) => {
                console.error('API Request Error:', error);
                return Promise.reject(error);
            }
        );

        // Response interceptor for error handling
        this.client.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response) {
                    console.error(`API Error: ${error.response.status} - ${error.response.data?.message || error.message}`);

                    // Handle common errors
                    switch (error.response.status) {
                        case 401:
                            throw new Error('Invalid API key');
                        case 429:
                            throw new Error('Rate limit exceeded. Please try again later.');
                        case 404:
                            throw new Error('Resource not found');
                        default:
                            throw new Error(error.response.data?.message || 'An error occurred');
                    }
                } else if (error.request) {
                    throw new Error('Network error. Please check your connection.');
                } else {
                    throw new Error('An unexpected error occurred');
                }
            }
        );
    }

    /**
     * Make GET request with error handling
     */
    protected async get<T>(url: string, config?: any): Promise<T> {
        const response = await this.client.get<T>(url, config);
        return response.data;
    }
}