import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ThemeService } from '@ztp/common/theme';
import { Observable } from 'rxjs';

@Component({
  selector: 'examples-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  darkTheme$: Observable<boolean>;
  constructor(private themeService: ThemeService) {
    this.darkTheme$ = this.themeService.darkTheme$;
  }
}
