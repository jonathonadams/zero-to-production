import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonUiToolbarComponent } from './toolbar.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ToolbarService } from './toolbar.service';

describe('CommonUiToolbarComponent', () => {
  let component: CommonUiToolbarComponent;
  let fixture: ComponentFixture<CommonUiToolbarComponent>;
  let toolbarService: ToolbarService;
  const toolbarServiceSpy = { visible$: jest.fn() };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CommonUiToolbarComponent],
      providers: [{ provide: ToolbarService, useValue: toolbarServiceSpy }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    toolbarService = TestBed.get<ToolbarService>(ToolbarService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonUiToolbarComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
