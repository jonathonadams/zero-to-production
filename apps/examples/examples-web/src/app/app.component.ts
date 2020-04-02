import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ThemeService } from '@ztp/common/utils/theme';
import { Observable } from 'rxjs';

@Component({
  selector: 'examples-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  darkMode$: Observable<boolean>;
  constructor(private themeService: ThemeService) {
    this.darkMode$ = this.themeService.darkMode$;
  }
}
