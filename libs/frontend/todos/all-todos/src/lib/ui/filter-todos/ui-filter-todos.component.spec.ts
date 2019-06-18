import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiFilterTodosComponent } from './ui-filter-todos.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('UiFilterTodosComponent', () => {
  let component: UiFilterTodosComponent;
  let fixture: ComponentFixture<UiFilterTodosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UiFilterTodosComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiFilterTodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
