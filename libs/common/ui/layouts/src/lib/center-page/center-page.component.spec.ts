import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterPageComponent } from './center-page.component';

describe('CenterPageComponent', () => {
  let component: CenterPageComponent;
  let fixture: ComponentFixture<CenterPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CenterPageComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CenterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
