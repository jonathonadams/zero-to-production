import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CssThemingComponent } from './css-theming.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ThemeService } from '@uqt/common/theme';
import { CodeHighlightService } from '@uqt/web/examples/code-highlight';

describe('CssThemingComponent', () => {
  let component: CssThemingComponent;
  let fixture: ComponentFixture<CssThemingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [CssThemingComponent],
      providers: [
        { provide: ThemeService, useValue: {} },
        { provide: CodeHighlightService, useValue: {} }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CssThemingComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
