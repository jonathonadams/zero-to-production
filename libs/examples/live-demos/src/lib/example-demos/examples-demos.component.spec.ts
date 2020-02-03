import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ExamplesDemosComponent } from './examples-demos.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ExamplesFacade } from '@uqt/examples/data-access';
import { of } from 'rxjs';
import { ModuleLoaderService } from '@uqt/shared/utils/dynamic-module-loading';

describe('ExamplesDemosComponent', () => {
  let component: ExamplesDemosComponent;
  let fixture: ComponentFixture<ExamplesDemosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExamplesDemosComponent],
      providers: [
        { provide: ExamplesFacade, useValue: { examples$: of(jest.fn()) } },
        { provide: ModuleLoaderService, useValue: {} }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamplesDemosComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
