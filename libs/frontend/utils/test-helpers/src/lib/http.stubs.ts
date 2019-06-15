import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

export class HttpStub {
  private expectedResponse: any | undefined;

  setExpectedResponse<T>(response: T) {
    this.expectedResponse = new HttpResponse<T>({ body: response });
  }

  get<T>(url: string): Observable<T> {
    return of<T>(this.expectedResponse);
  }

  put<T>(url: string, data: any): Observable<T> {
    return of<T>(this.expectedResponse);
  }

  post<T>(url: string, data: any): Observable<T> {
    return of<T>(this.expectedResponse);
  }

  delete<T>(url: string, data: any): Observable<T> {
    return of<T>(this.expectedResponse);
  }
}
