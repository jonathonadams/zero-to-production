import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Generic API service for all basic CRUD operations.
 *
 * Provides generics for type checking.
 */
@Injectable()
export class ApiService {
  constructor(
    @Inject('apiBaseUrl') private baseUrl: string,
    private http: HttpClient
  ) {}

  get<T>(url: string, params: HttpParams = new HttpParams()): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${url}`, {
      headers: this.headers,
      params
    });
  }

  getOne<T>(url: string, id: string | number): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${url}/${id}`, {
      headers: this.headers
    });
  }

  post<T>(url: string, body: T): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${url}`, body, {
      headers: this.headers
    });
  }

  put<T extends { id: string | number }>(url: string, body: T): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${url}/${body.id}`, body, {
      headers: this.headers
    });
  }

  delete<T extends { id: string | number }>(
    url: string,
    body: T
  ): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${url}/${body.id}`, {
      headers: this.headers
    });
  }

  get headers(): HttpHeaders {
    const headersConfig = {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    };

    return new HttpHeaders(headersConfig);
  }
}
