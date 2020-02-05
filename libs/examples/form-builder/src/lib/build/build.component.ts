import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { IDynamicFormConfig } from '@uqt/common/dynamic-form';
import { FormBuilderFacade, expandAnimation } from '@uqt/common/form-builder';

@Component({
  selector: 'ex-example-form-builder-build',
  templateUrl: './build.component.html',
  styleUrls: ['./build.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [expandAnimation]
})
export class ExampleFormBuilderBuildComponent {
  selectedForm$: Observable<IDynamicFormConfig | undefined>;
  constructor(private formBuilderFacade: FormBuilderFacade) {
    this.selectedForm$ = this.formBuilderFacade.selectedForm$;
  }
}
