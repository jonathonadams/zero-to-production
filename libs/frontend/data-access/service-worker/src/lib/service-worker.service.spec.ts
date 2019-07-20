import { TestBed } from '@angular/core/testing';
import { SwUpdate } from '@angular/service-worker';

import { ServiceWorkerService } from './service-worker.service';
import { ApplicationRef } from '@angular/core';
import { of } from 'rxjs';

describe('ServiceWorkerService', () => {
  let service: ServiceWorkerService;
  let updates: SwUpdate;
  let appRef: ApplicationRef;
  const updateSpy = {
    available: of(jest.fn()),
    activated: of(jest.fn())
  };
  const appRefSpy = {
    isStable: of(jest.fn())
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ServiceWorkerService,
        { provide: SwUpdate, useValue: updateSpy },
        { provide: ApplicationRef, useValue: appRefSpy }
      ]
    });
    service = TestBed.get<ServiceWorkerService>(ServiceWorkerService);
    updates = TestBed.get<SwUpdate>(SwUpdate);
    appRef = TestBed.get<ApplicationRef>(ApplicationRef);
  });

  it('should be created', () => {
    const service: ServiceWorkerService = TestBed.get(ServiceWorkerService);
    expect(service).toBeTruthy();
  });
});
