import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DropDownMenuComponent } from './drop-down-menu.component';

describe('DropDownMenuComponent', () => {
  let component: DropDownMenuComponent;
  let fixture: ComponentFixture<DropDownMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DropDownMenuComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropDownMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
