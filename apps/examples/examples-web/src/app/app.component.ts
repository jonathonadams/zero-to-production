import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { ThemeService } from '@uqt/common/theme';
import { Observable } from 'rxjs';

@Component({
  selector: 'examples-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  darkTheme$: Observable<boolean>;
  constructor(private themeService: ThemeService) {
    this.darkTheme$ = this.themeService.darkTheme$;
  }
}
