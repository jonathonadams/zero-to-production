import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamplesHomeComponent } from './home.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ExamplesFacade } from '@uqt/examples/data-access';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('ExamplesHomeComponent', () => {
  let component: ExamplesHomeComponent;
  let fixture: ComponentFixture<ExamplesHomeComponent>;
  const facadeSpy = { examples$: of(jest.fn) };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ExamplesHomeComponent],
      providers: [{ provide: ExamplesFacade, useValue: facadeSpy }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamplesHomeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
