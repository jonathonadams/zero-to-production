import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SideNavService } from '@ngw/frontend/common/ui/side-nav';
import { TodoFeatureShellComponent } from './todos-feature-shell.component';
import { ToolbarService } from '@ngw/frontend/common/ui/toolbar';
import { of } from 'rxjs';
import { UserThemeService } from '@ngw/frontend/common/theme';

// TODO -> TESTS
describe('TodoFeatureShellComponent', () => {
  let component: TodoFeatureShellComponent;
  let fixture: ComponentFixture<TodoFeatureShellComponent>;
  let themeService: UserThemeService;
  let navService: SideNavService;
  let toolbarService: ToolbarService;
  const sideNavSpy = {
    lastScrollDown$: of(jest.fn())
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TodoFeatureShellComponent],
      providers: [
        { provide: UserThemeService, useValue: {} },
        { provide: SideNavService, useValue: sideNavSpy },
        { provide: ToolbarService, useValue: {} }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    themeService = TestBed.get<UserThemeService>(UserThemeService);
    navService = TestBed.get<SideNavService>(SideNavService);
    toolbarService = TestBed.get<ToolbarService>(ToolbarService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoFeatureShellComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
