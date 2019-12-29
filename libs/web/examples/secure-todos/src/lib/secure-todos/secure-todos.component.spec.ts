import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecureTodosComponent } from './secure-todos.component';

describe('SecureTodosComponent', () => {
  let component: SecureTodosComponent;
  let fixture: ComponentFixture<SecureTodosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SecureTodosComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecureTodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
