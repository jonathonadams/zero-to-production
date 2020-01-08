import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

interface TestData {
  id: string;
  data: string;
}

import { ApiService } from './api.service';
import { Type } from '@angular/core';

describe('ApiService', () => {
  const testData: TestData = { id: '1', data: 'some data' };
  let apiService: ApiService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService, { provide: 'apiBaseUrl', useValue: 'api' }]
    });

    // Inject the http service and test controller for each test
    apiService = TestBesd.inject<ApiService>(ApiService);
    httpClient = TestBesd.inject<HttpClient>(HttpClient);
    httpTestingController = TestBesd.inject(
      HttpTestingController as Type<HttpTestingController>
    );
  });

  it('should be created', () => {
    expect(apiService).toBeTruthy();
  });

  describe('get', () => {
    it('should make a GET request to the API url /resources without query params', () => {
      // Make an HTTP GET request
      apiService.get<TestData>('test').subscribe(data => {
        // When observable resolves, result should match test data
        expect(data).toEqual([testData]);
      });

      // The following `expectOne()` will match the request's URL.
      // If no requests or multiple requests matched that URL
      // `expectOne()` would throw.
      const req = httpTestingController.expectOne(`api/test`);

      // Assert that the request is a GET.
      expect(req.request.method).toEqual('GET');

      // Respond with mock data, causing Observable to resolve.
      // Subscribe callback asserts that correct data was returned.
      req.flush([testData]);

      // Finally, assert that there are no outstanding requests.
      httpTestingController.verify();
    });

    it('should make a GET request to the API url /resources with query params', () => {
      apiService
        .get<TestData>('test', { data: 'some data' })
        .subscribe(data => {
          expect(data).toEqual(testData);
        });

      const req = httpTestingController.expectOne(`api/test?data=some%20data`);

      expect(req.request.method).toEqual('GET');
      expect(req.request.params).toBeTruthy();
      expect(req.request.params.get('data')).toEqual('some data');

      req.flush(testData);
      httpTestingController.verify();
    });
  });

  describe('getOne', () => {
    it('should make a GET request to the API url /resources/:id', () => {
      apiService.getOne<TestData>('test', testData.id).subscribe(data => {
        expect(data).toEqual(testData);
      });

      const req = httpTestingController.expectOne(`api/test/${testData.id}`);

      expect(req.request.method).toEqual('GET');
      req.flush(testData);
      httpTestingController.verify();
    });
  });

  describe('post', () => {
    it('should make a POST request to the API url /resources', () => {
      apiService.post<TestData>('test', testData).subscribe(data => {
        expect(data).toEqual(testData);
      });

      const req = httpTestingController.expectOne(`api/test`);

      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(testData);
      req.flush(testData);
      httpTestingController.verify();
    });
  });

  describe('put', () => {
    it('should make a PUT request to the API url /resources/:id', () => {
      apiService.put<TestData>('test', testData).subscribe(data => {
        expect(data).toEqual(testData);
      });

      const req = httpTestingController.expectOne(`api/test/${testData.id}`);

      expect(req.request.method).toEqual('PUT');
      req.flush(testData);
      httpTestingController.verify();
    });
  });

  describe('delete', () => {
    it('should make a DELETE request to the API url /resources/:id', () => {
      apiService.delete<TestData>('test', testData).subscribe(data => {
        expect(data).toEqual(testData);
      });

      const req = httpTestingController.expectOne(`api/test/${testData.id}`);

      expect(req.request.method).toEqual('DELETE');
      req.flush(testData);
      httpTestingController.verify();
    });
  });
});
