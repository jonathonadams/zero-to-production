import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiTodoDetailComponent } from './ui-todo-detail.component';

describe('UiTodoDetailComponent', () => {
  let component: UiTodoDetailComponent;
  let fixture: ComponentFixture<UiTodoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UiTodoDetailComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiTodoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
