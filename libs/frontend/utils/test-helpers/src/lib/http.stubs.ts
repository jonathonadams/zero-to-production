import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

export class HttpStub {
  private expectedResponse;

  setExpectedResponse<T>(response: T) {
    this.expectedResponse = new HttpResponse<T>({ body: response });
  }

  get<T>(url): Observable<T> {
    return of<T>(this.expectedResponse);
  }

  put<T>(url, data): Observable<T> {
    return of<T>(this.expectedResponse);
  }

  post<T>(url, data): Observable<T> {
    return of<T>(this.expectedResponse);
  }

  delete<T>(url): Observable<T> {
    return of<T>(this.expectedResponse);
  }
}
