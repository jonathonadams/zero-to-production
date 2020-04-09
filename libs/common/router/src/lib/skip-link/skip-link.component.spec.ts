import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterSkipLinkComponent } from './skip-link.component';

describe('RouterSkipLinkComponent', () => {
  let component: RouterSkipLinkComponent;
  let fixture: ComponentFixture<RouterSkipLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RouterSkipLinkComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouterSkipLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
