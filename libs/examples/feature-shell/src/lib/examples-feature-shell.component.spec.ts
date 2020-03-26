import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamplesFeatureShellComponent } from './examples-feature-shell.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ExamplesFacade } from '@ztp/examples/data-access';

describe('ExamplesFeatureShellComponent', () => {
  let component: ExamplesFeatureShellComponent;
  let fixture: ComponentFixture<ExamplesFeatureShellComponent>;

  const facadeSpy = { addExamples: jest.fn() };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExamplesFeatureShellComponent],
      providers: [{ provide: ExamplesFacade, useValue: facadeSpy }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamplesFeatureShellComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
