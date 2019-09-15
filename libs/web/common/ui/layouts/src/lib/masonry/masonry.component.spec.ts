import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasonryComponent } from './masonry.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('MasonryComponent', () => {
  let component: MasonryComponent;
  let fixture: ComponentFixture<MasonryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MasonryComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasonryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
