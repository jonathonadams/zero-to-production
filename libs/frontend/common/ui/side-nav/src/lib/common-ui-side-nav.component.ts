import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ElementRef,
  ViewChild
} from '@angular/core';
import { Observable } from 'rxjs';
import { ISideNaveLink } from '@workspace/shared/data';
import { CommonUiSideNavService } from './common-ui-side-nav.service';

@Component({
  selector: 'todo-common-side-nav',
  templateUrl: './common-ui-side-nav.component.html',
  styleUrls: ['./common-ui-side-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommonUiSideNavComponent {
  @Input() navLinks: ISideNaveLink[] | undefined;
  private lastScrollPosition: number = 0;
  private lastScrollDown: boolean = false;

  public opened$: Observable<boolean>;

  @ViewChild('appContent', { static: true }) private content!: ElementRef<
    HTMLElement
  >;

  constructor(private sideNavService: CommonUiSideNavService) {
    this.opened$ = sideNavService.opened$;
  }

  setValue(value: boolean) {
    this.sideNavService.openedValue = value;
  }

  scroll() {
    if (this.content.nativeElement.scrollTop > this.lastScrollPosition) {
      if (!this.lastScrollDown) {
        this.lastScrollDown = true;
        this.sideNavService.lastScrollDown = true;
      }
    } else {
      if (this.lastScrollDown) {
        this.lastScrollDown = false;
        this.sideNavService.lastScrollDown = false;
      }
    }
    this.lastScrollPosition = this.content.nativeElement.scrollTop;
  }
}
