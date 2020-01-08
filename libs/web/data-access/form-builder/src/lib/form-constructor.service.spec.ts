import { TestBed } from '@angular/core/testing';
import { FormBuilderConstructorService } from './form-constructor.service';

describe('FormBuilderConstructorService', () => {
  let service: FormBuilderConstructorService;

  beforeAll(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [FormBuilderConstructorService]
    });

    service = TestBed.inject<FormBuilderConstructorService>(
      FormBuilderConstructorService
    );
  });

  it('should be truthy', () => {
    expect(service).toBeTruthy();
  });
});
