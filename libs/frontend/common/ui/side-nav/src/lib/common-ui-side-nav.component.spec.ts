import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonUiSideNavComponent } from './common-ui-side-nav.component';
import { CommonUiSideNavService } from './common-ui-side-nav.service';

describe('CommonUiSideNavComponent', () => {
  let component: CommonUiSideNavComponent;
  let fixture: ComponentFixture<CommonUiSideNavComponent>;
  let debugEl: DebugElement;
  let nativeEl: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, RouterTestingModule],
      declarations: [CommonUiSideNavComponent],
      providers: [
        { provide: CommonUiSideNavService, useValue: { opened$: jest.fn() } }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonUiSideNavComponent);
    component = fixture.componentInstance;
    debugEl = fixture.debugElement;
    nativeEl = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
