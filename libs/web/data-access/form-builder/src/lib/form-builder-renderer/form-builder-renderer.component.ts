import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { IFormBuilderStructure } from '../form-builder.interface';
import { FormBuilderConstructorService } from '../form-constructor.service';
import { DynamicFormFacade } from '@uqt/data-access/dynamic-form';

@Component({
  selector: 'uqt-form-builder-renderer',
  templateUrl: './form-builder-renderer.component.html',
  styleUrls: ['./form-builder-renderer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormBuilderRendererComponent {
  formName: string | undefined;

  constructor(
    private fbConstructor: FormBuilderConstructorService,
    private dynamicFormFacade: DynamicFormFacade
  ) {}

  @Input()
  set config(fbConfig: IFormBuilderStructure | null | undefined) {
    if (fbConfig) {
      const formName = fbConfig.config.formName;
      this.dynamicFormFacade.createFormIfNotExist(formName);

      const {
        structure,
        config
      } = this.fbConstructor.creteDyanmicFormStructureFromBuilderConfig(
        fbConfig
      );

      this.dynamicFormFacade.setFormConfig(formName, config);
      this.dynamicFormFacade.setStructure(formName, structure);

      this.formName = formName;
    }
  }
}
