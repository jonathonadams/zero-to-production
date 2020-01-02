import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleFromBuilderBuildComponent } from './build.component';

describe('ExampleFromBuilderBuildComponent', () => {
  let component: ExampleFromBuilderBuildComponent;
  let fixture: ComponentFixture<ExampleFromBuilderBuildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExampleFromBuilderBuildComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleFromBuilderBuildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
