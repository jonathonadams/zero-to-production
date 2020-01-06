import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ExamplesDemosComponent } from './examples-demos.component';

describe('ExamplesDemosComponent', () => {
  let component: ExamplesDemosComponent;
  let fixture: ComponentFixture<ExamplesDemosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExamplesDemosComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamplesDemosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
