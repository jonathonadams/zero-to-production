import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZtpAnchorComponent } from './ztp-anchor.component';

describe('ZtpAnchorComponent', () => {
  let component: ZtpAnchorComponent;
  let fixture: ComponentFixture<ZtpAnchorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ZtpAnchorComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZtpAnchorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
