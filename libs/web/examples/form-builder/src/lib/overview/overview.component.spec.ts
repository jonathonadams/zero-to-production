import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleFormBuilderOverviewComponent } from './overview.component';

describe('ExampleFormBuilderOverviewComponent', () => {
  let component: ExampleFormBuilderOverviewComponent;
  let fixture: ComponentFixture<ExampleFormBuilderOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExampleFormBuilderOverviewComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleFormBuilderOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
