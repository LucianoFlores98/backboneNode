/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import axiosRetry from "axios-retry";
import HttpStatusCode from "./httpStatusCodes";
import { HttpParams, HttpResponse, IHttpClient } from "./interfaces";
import { DependencyManager } from "../../dependencyManager";

const baseUrl = process.env.PYTHON_PROCESS_URL;

enum HttpMethod {
  GET = "GET",
  POST = "POST",
  DELETE = "DELETE",
  PUT = "PUT",
  PATCH = "PATCH",
}

export const httpClientModuleInitialize = (
  dependencyManager: DependencyManager
): void => {
  const axiosInstance = createAxiosInstance();
  configRetryStrategy(axiosInstance);
  configRequestInterceptor(axiosInstance);
  configResponseInterceptor(axiosInstance);
  const httpClient = getHttpClient(axiosInstance);
  dependencyManager.register("httpClient", httpClient);
};

/**
 * @description creates a new instance of axios
 **/
const createAxiosInstance = () => {
  const config: AxiosRequestConfig = {
    baseURL: baseUrl,
  };
  return axios.create(config);
};

/**
 * @description retry strategy for axios
 **/
const configRetryStrategy = (axiosInstance: AxiosInstance) => {
  axiosRetry(axiosInstance, {
    retries: 3,
    retryDelay: axiosRetry.exponentialDelay,
  });
};

/**
 * @description intercept every request and add custom headers
 **/
const configRequestInterceptor = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use(async (request) => {
    if (request.headers) {
    }

    if (request.data) {
      //console.info('Request Params', request.data);
    }
    return request;
  });
};

/**
 * @description intercept every response and check if it has error
 **/
const configResponseInterceptor = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.response.use(
    (response) => {
      if (!response) {
        returnError();
        return Promise.reject(response);
      } else if (isServerError(response)) {
        returnError();
        return Promise.reject(toHttpResponse(response));
      } else if (isBusinessError(response)) {
        return Promise.reject(toHttpResponse(response));
      } else {
        return Promise.resolve(toHttpResponse(response));
      }
    },
    (error) => {
      return Promise.reject(error.response.data.message);
    }
  );
};

/**
 * @description redirects to error screen
 **/
const returnError = (error?: any): void => {
  throw new Error(error);
};

/**
 * @description creates http response
 **/
const createHttpResponse = (
  code: number,
  data: any,
  error: any,
  status: boolean
): HttpResponse => {
  return {
    code,
    data,
    error: {
      message: status ? error.message : error.message ?? "Undefined error",
    },
    status,
  } as HttpResponse;
};

/**
 * @description converts axios response to http response
 **/
const toHttpResponse = (response: AxiosResponse): any => {
  const data = response.data;
  try {
    return createHttpResponse(
      response.status,
      data.details,
      data.message,
      data.status
    );
  } catch (err) {
    return createHttpResponse(
      response.status,
      response.data,
      response.statusText,
      false
    );
  }
};

/**
 * @description check if response is server error
 **/
const isServerError = (response: AxiosResponse): boolean => {
  return response.status >= HttpStatusCode.INTERNAL_SERVER_ERROR;
};

/**
 * @description check if response is business error
 **/
const isBusinessError = (response: AxiosResponse): boolean => {
  return response.status >= HttpStatusCode.BAD_REQUEST;
};

/**
 * @param {string}  url url to request
 * @param {object}  params key value pair of params
 * @returns {string} url concatenated with query params
 **/
const getFullUrl = (url = "", params?: HttpParams) => {
  let queryParams = "";
  if (params && Object.keys(params).length > 0) {
    queryParams = `?${Object.keys(params)
      .map((key) => `${key}=${params[key]}`)
      .join("&")}`;
  }
  return `${url}${queryParams}`;
};

/**
 * @param {AxiosInstance}  axiosInstance axios instance
 * @param {HttpMethod}  httpMethod http method to use
 * @param {string}  url url to request
 * @param {object}  params key value pair of params
 * @param {object}  headers key value pair of headers
 * @param {string}  contentType content type of request
 * @returns {string} url concatenated with query params
 **/
const executeApiCall = async (
  axiosInstance: AxiosInstance,
  httpMethod: HttpMethod,
  url = "",
  params = {},
  headers = {},
  contentType = "application/json"
): Promise<HttpResponse> => {
  const customHeaders = {
    headers: {
      Accept: "application/json",
      "Content-Type": contentType,
      ...headers,
    },
  };
  if (httpMethod === HttpMethod.GET) {
    return axiosInstance.get(getFullUrl(url, params), customHeaders);
  }

  if (httpMethod === HttpMethod.DELETE) {
    return axiosInstance.delete(getFullUrl(url), customHeaders);
  }

  if (httpMethod === HttpMethod.PUT) {
    return axiosInstance.put(getFullUrl(url), params, customHeaders);
  }

  if (httpMethod === HttpMethod.PATCH) {
    return axiosInstance.patch(getFullUrl(url), params, customHeaders);
  }
  return axiosInstance.post(getFullUrl(url), params, customHeaders);
};

/**
 * @param {AxiosInstance} axiosInstance axios instance
 * @returns {IHttpClient} http client
 **/
const getHttpClient = (axiosInstance: AxiosInstance): IHttpClient => {
  return {
    get: (
      url = "",
      params = {},
      headers = {},
      contentType = "application/json"
    ) => {
      return executeApiCall(
        axiosInstance,
        HttpMethod.GET,
        url,
        params,
        headers,
        contentType
      );
    },
    post: (
      url = "",
      params = {},
      headers = {},
      contentType = "application/json"
    ) => {
      return executeApiCall(
        axiosInstance,
        HttpMethod.POST,
        url,
        params,
        headers,
        contentType
      );
    },
    delete: (
      url = "",
      params = {},
      headers = {},
      contentType = "application/json"
    ) => {
      return executeApiCall(
        axiosInstance,
        HttpMethod.DELETE,
        url,
        params,
        headers,
        contentType
      );
    },
    put: (
      url = "",
      params = {},
      headers = {},
      contentType = "application/json"
    ) => {
      return executeApiCall(
        axiosInstance,
        HttpMethod.PUT,
        url,
        params,
        headers,
        contentType
      );
    },
    patch: (
      url = "",
      params = {},
      headers = {},
      contentType = "application/json"
    ) => {
      return executeApiCall(
        axiosInstance,
        HttpMethod.PATCH,
        url,
        params,
        headers,
        contentType
      );
    },
  };
};
