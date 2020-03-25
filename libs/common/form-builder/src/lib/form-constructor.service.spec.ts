import { TestBed } from '@angular/core/testing';
import { FormBuilderConstructorService } from './form-constructor.service';
import { ReactiveFormsModule } from '@angular/forms';

describe('FormBuilderConstructorService', () => {
  let service: FormBuilderConstructorService;

  beforeAll(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [FormBuilderConstructorService],
    });

    service = TestBed.inject<FormBuilderConstructorService>(
      FormBuilderConstructorService
    );
  });

  it('should be truthy', () => {
    expect(service).toBeTruthy();
  });
});
