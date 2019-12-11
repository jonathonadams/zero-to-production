import { TestBed } from '@angular/core/testing';
import { FormConstructorService } from './form-constructor.service';

describe('FormConstructorService', () => {
  let service: FormConstructorService;

  beforeAll(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [FormConstructorService]
    });

    service = TestBed.get<FormConstructorService>(FormConstructorService);
  });

  it('should be truthy', () => {
    expect(service).toBeTruthy();
  });
});
