import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridLayoutComponent } from './grid-layout.component';
import { GridLayoutService } from '../grid-layout.service';

describe('GridLayoutComponent', () => {
  let component: GridLayoutComponent;
  let fixture: ComponentFixture<GridLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GridLayoutComponent],
      providers: [{ provide: GridLayoutService, useValue: {} }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridLayoutComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
