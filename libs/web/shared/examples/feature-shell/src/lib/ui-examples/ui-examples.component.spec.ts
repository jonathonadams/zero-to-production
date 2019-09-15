import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiExamplesComponent } from './ui-examples.component';

describe('UiExamplesComponent', () => {
  let component: UiExamplesComponent;
  let fixture: ComponentFixture<UiExamplesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UiExamplesComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiExamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
