import {
  Component,
  ChangeDetectionStrategy,
  AfterViewInit,
  OnInit
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ThemeService } from '@uqt/common/theme';
import { CodeHighlightService } from '@uqt/examples/utils';
import { css, ts, appInit } from './css-theming.code';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Observable } from 'rxjs';

@Component({
  selector: 'ex-css-theming',
  templateUrl: './css-theming.component.html',
  styleUrls: ['./css-theming.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CssThemingComponent implements OnInit, AfterViewInit {
  form: FormGroup;
  dark$: Observable<boolean>;

  css = css;
  ts = ts;
  appInit = appInit;

  constructor(
    private fb: FormBuilder,
    private themeService: ThemeService,
    private highlightService: CodeHighlightService
  ) {
    this.dark$ = this.themeService.darkTheme$;
    this.form = this.fb.group(this.baseTheme);

    this.form.valueChanges.subscribe(themeSettings => {
      this.themeService.setThemeColors(themeSettings);
    });
  }

  ngOnInit() {
    const theme = this.themeService.themeSettings;
    this.form.reset(theme ? theme : this.baseTheme);
  }

  resetTheme() {
    this.form.reset(this.baseTheme);
  }

  get baseTheme() {
    return {
      lightPrimary: ['#ffaa00'],
      lightAccent: ['#6ec8ff'],
      darkPrimary: ['#20eff0'],
      darkAccent: ['#d33685']
    };
  }

  darkThemeChanged(change: MatCheckboxChange) {
    this.themeService.setDarkThemeStatus(change.checked);
  }

  ngAfterViewInit() {
    this.highlightService.highlightAll();
  }
}
