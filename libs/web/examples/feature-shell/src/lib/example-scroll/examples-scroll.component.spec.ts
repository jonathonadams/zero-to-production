import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ExamplesScrollComponent } from './examples-scroll.component';

describe('ExamplesScrollComponent', () => {
  let component: ExamplesScrollComponent;
  let fixture: ComponentFixture<ExamplesScrollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExamplesScrollComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamplesScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
