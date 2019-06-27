import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonUiSideNavService } from '@workspace/frontend/common/ui/side-nav';
import { TodoFeatureShellComponent } from './todos-feature-shell.component';
import { ToolbarService } from '@workspace/frontend/common/ui/toolbar';
import { of } from 'rxjs';

describe('TodoFeatureShellComponent', () => {
  let component: TodoFeatureShellComponent;
  let fixture: ComponentFixture<TodoFeatureShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TodoFeatureShellComponent],
      providers: [
        {
          provide: CommonUiSideNavService,
          useValue: {
            lastScrollDown$: of(jest.fn())
          }
        },
        {
          provide: ToolbarService,
          useValue: {}
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoFeatureShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
