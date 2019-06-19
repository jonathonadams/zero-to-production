import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ToolbarMenuIconComponent } from './toolbar-menu-icon.component';

describe('ToolbarMenuIconComponent', () => {
  let component: ToolbarMenuIconComponent;
  let fixture: ComponentFixture<ToolbarMenuIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ToolbarMenuIconComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarMenuIconComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
