export interface HttpParams {
  [key: string]: any;
}

export interface HttpHeaders {
  [key: string]: any;
}

export interface HttpResponse {
  code: number;
  data: any;
  error: HttpError;
  status: boolean;
  [key: string]: any;
}

export interface IHttpClient {
  get: (
    url: string,
    params?: HttpParams,
    headers?: HttpHeaders,
    contentType?: string
  ) => Promise<any>;
  post: (
    url: string,
    params?: HttpParams | string,
    headers?: HttpHeaders,
    contentType?: string
  ) => Promise<any>;
  delete: (
    url: string,
    params?: HttpParams | string,
    headers?: HttpHeaders,
    contentType?: string
  ) => Promise<any>;
  put: (
    url: string,
    params?: HttpParams | string,
    headers?: HttpHeaders,
    contentType?: string
  ) => Promise<any>;
  patch: (
    url: string,
    params?: HttpParams | string,
    headers?: HttpHeaders,
    contentType?: string
  ) => Promise<any>;
}

interface HttpError {
  message: string;
}
