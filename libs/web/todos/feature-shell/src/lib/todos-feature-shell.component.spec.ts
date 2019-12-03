import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TodoFeatureShellComponent } from './todos-feature-shell.component';
import { SideNavFacade } from '@uqt/common/ui/side-nav';

// TODO -> TESTS
describe('TodoFeatureShellComponent', () => {
  let component: TodoFeatureShellComponent;
  let fixture: ComponentFixture<TodoFeatureShellComponent>;
  let navFacade: SideNavFacade;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TodoFeatureShellComponent],
      providers: [{ provide: SideNavFacade, useValue: {} }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    navFacade = TestBed.get<SideNavFacade>(SideNavFacade);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoFeatureShellComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
