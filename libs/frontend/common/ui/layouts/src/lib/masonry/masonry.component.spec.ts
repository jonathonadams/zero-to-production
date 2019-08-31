import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasonryComponent } from './masonry.component';

describe('MasonryComponent', () => {
  let component: MasonryComponent;
  let fixture: ComponentFixture<MasonryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MasonryComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasonryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
