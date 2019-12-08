import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamplesAboutComponent } from './examples-about.component';

describe('ExamplesAboutComponent', () => {
  let component: ExamplesAboutComponent;
  let fixture: ComponentFixture<ExamplesAboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExamplesAboutComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamplesAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
