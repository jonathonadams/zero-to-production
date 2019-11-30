import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CssThemingComponent } from './css-theming.component';

describe('CssThemingComponent', () => {
  let component: CssThemingComponent;
  let fixture: ComponentFixture<CssThemingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CssThemingComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CssThemingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
