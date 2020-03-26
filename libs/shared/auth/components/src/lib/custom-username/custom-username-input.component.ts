import {
  Component,
  ChangeDetectionStrategy,
  Input,
  HostBinding,
  ElementRef,
  OnDestroy,
  Optional,
  Self,
} from '@angular/core';
import {
  FormGroup,
  ControlValueAccessor,
  AbstractControl,
  NgControl,
} from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Observable, Subject } from 'rxjs';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { FocusMonitor } from '@angular/cdk/a11y';
import { AuthFacade } from '@uqt/shared/data-access/auth';
import { IInputField } from '@uqt/common/dynamic-form';

@Component({
  selector: 'uqt-custom-username-input',
  templateUrl: './custom-username-input.component.html',
  styleUrls: ['./custom-username-input.component.scss'],
  providers: [
    { provide: MatFormFieldControl, useExisting: CustomUsernameInputComponent },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomUsernameInputComponent
  implements ControlValueAccessor, MatFormFieldControl<string>, OnDestroy {
  static nextId = 0;
  static ngAcceptInputType_disabled: boolean | string | null | undefined;
  static ngAcceptInputType_required: boolean | string | null | undefined;

  isAvailable$: Observable<boolean | 'pending' | null>;

  @Input() group: FormGroup;
  @Input() field: IInputField;

  stateChanges = new Subject<void>();
  focused = false;
  errorState = false;
  controlType = 'register-username-input';
  @HostBinding('id')
  id = `register-username-input-${CustomUsernameInputComponent.nextId}`;
  @HostBinding('attr.aria-describedby') describedBy = '';

  private _placeholder: string;
  private _required = false;
  private _disabled = false;

  onChange = (_: any) => {};
  onTouched = () => {};

  get empty() {
    if (this.group) {
      // Aligns with the form field in the template
      const { username } = this.group.value;
      return !username;
    } else {
      return false;
    }
  }

  @HostBinding('class.floating')
  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  @Input()
  get placeholder(): string {
    return this._placeholder;
  }
  set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
  }

  @Input()
  get required(): boolean {
    return this._required;
  }
  set required(value: boolean) {
    this._required = coerceBooleanProperty(value);
    this.stateChanges.next();
  }

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);

    if (this.group && this.field) {
      const control = this.group.get(this.field.name);

      if (control) {
        this._disabled ? control.disable() : control.enable();
      }
    }
    this.stateChanges.next();
  }

  @Input()
  get value(): string | null {
    if (this.group && this.field) {
      const control = this.group.get(this.field.name) as AbstractControl;
      return control.value as string;
    }
    return null;
  }
  set value(username: string | null) {
    if (this.group && this.field) {
      const control = this.group.get(this.field.name) as AbstractControl;
      control.setValue(username);
    }
    this.stateChanges.next();
  }

  constructor(
    private facade: AuthFacade,
    private _focusMonitor: FocusMonitor,
    private _elRef: ElementRef<HTMLElement>,
    @Optional() @Self() public ngControl: NgControl
  ) {
    this.isAvailable$ = this.facade.isAvailable$;

    _focusMonitor.monitor(_elRef, true).subscribe((origin) => {
      if (this.focused && !origin) {
        this.onTouched();
      }
      this.focused = !!origin;
      this.stateChanges.next();
    });

    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnDestroy() {
    this.stateChanges.complete();
    this._focusMonitor.stopMonitoring(this._elRef);
  }

  setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(' ');
  }

  onContainerClick(event: MouseEvent) {
    if ((event.target as Element).tagName.toLowerCase() !== 'input') {
      (this._elRef.nativeElement.querySelector('input') as HTMLElement).focus();
    }
  }

  writeValue(username: string | null): void {
    this.value = username;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  _handleInput(): void {
    if (this.group && this.field) {
      const control = this.group.get(this.field.name) as AbstractControl;
      this.onChange(control.value);
    }
  }
}
