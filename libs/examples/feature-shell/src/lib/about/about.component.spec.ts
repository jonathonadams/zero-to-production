import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutComponent } from './about.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ExamplesFacade } from '@uqt/examples/data-access';
import { of } from 'rxjs';
import { RouterModule, Router } from '@angular/router';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;
  const facadeSpy = { examples$: of(jest.fn) };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterModule],
      declarations: [AboutComponent],
      providers: [
        { provide: ExamplesFacade, useValue: facadeSpy },
        { provide: Router, useValue: {} }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
