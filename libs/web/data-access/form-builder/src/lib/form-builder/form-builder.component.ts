import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Subscription, Observable } from 'rxjs';
import { FormBuilderFacade } from '../+state/form-builder.facade';
import compose from 'ramda/es/compose';
import { FormBuilderConstructorService } from '../form-constructor.service';
import { map, filter, tap, first, distinctUntilChanged } from 'rxjs/operators';
import {
  IDynamicFormConfig,
  FormFieldTypes,
  FormGroupTypes
} from '@uqt/data-access/dynamic-form';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { expandAnimation } from './form.animation';

@Component({
  selector: 'uqt-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [expandAnimation]
})
export class FormBuilderComponent {
  faTrash = faTrash;

  toolBoxGroupId: string;
  toolBoxFieldId: string;
  dropListIds$: Observable<string[]>;

  builderForm: FormGroup;
  selectedForm$: Observable<IDynamicFormConfig | undefined>;

  showFormConfig = false;

  private sub: Subscription;

  constructor(
    private facade: FormBuilderFacade,
    private constructorService: FormBuilderConstructorService,
    private cd: ChangeDetectorRef
  ) {
    this.selectedForm$ = this.facade.selectedForm$;
    this.toolBoxGroupId = this.constructorService.toolBoxGroupId;
    this.toolBoxFieldId = this.constructorService.toolBoxFieldId;
    this.dropListIds$ = this.constructorService.dropListIds$;
  }

  ngOnInit() {
    this.sub = (this.selectedForm$ as Observable<IDynamicFormConfig>)
      .pipe(
        filter(fb => fb !== undefined),
        // Don't rebuild the form if the name is the same
        // This would only be the case when you click the save button, in which case the forms
        // are in sync
        distinctUntilChanged((prev, curr) => prev.formName === curr.formName),
        map(fb => this.constructorService.formBuilder(fb)),
        tap(form => (this.builderForm = form))
      )
      .subscribe(f => {
        this.constructorService.createConnectedToId(this.structure.length);
        this.cd.detectChanges();
      });
  }

  get structure() {
    return (this.builderForm.get('config') as FormGroup).get(
      'structure'
    ) as FormArray;
  }

  getGroupFields(index: number) {
    return (this.structure.get(String(index)) as FormGroup).get(
      'fields'
    ) as FormArray;
  }

  toggleFormConfig() {
    this.showFormConfig = !this.showFormConfig;
  }

  deleteFormGroup(i: number): void {
    this.structure.removeAt(i);
  }

  removeGroupField({
    groupIndex,
    fieldIndex
  }: {
    groupIndex: number;
    fieldIndex: number;
  }) {
    this.getGroupFields(groupIndex).removeAt(fieldIndex);
  }

  onSubmit(form: FormGroup) {
    if (form.valid) {
      this.selectedForm$.pipe(first()).subscribe(builderForm => {
        const { config } = form.value;
        const newForm = { ...builderForm, ...config };
        this.facade.updateForm(newForm);
      });
    }
  }

  formGroupDropped(event: CdkDragDrop<FormGroup[]>) {
    const formGroups = this.structure;
    if (event.previousContainer.id !== event.container.id) {
      // It is a new group being dropped
      const groupType: FormGroupTypes = event.item.data;
      const formGroup = this.constructorService.createFormGroup(groupType);
      formGroups.insert(event.currentIndex, formGroup);

      this.constructorService.createConnectedToId(formGroups.length);
    } else {
      // re-ordering the form groups
      this.constructorService.moveFormArrayGroup(
        formGroups,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  // createConnectedToId(groups: number) {
  //   const ids: string[] = [];
  //   for (let i = 0; i < groups; i++) {
  //     ids.push(this.createFieldsId(i));
  //   }
  //   return ids;
  // }

  createFieldsId(index: number) {
    return this.constructorService.createFieldsId(index);
  }

  formFieldDropped(event: CdkDragDrop<FormGroup[]>) {
    const currentGroupIndex = getFormGroupIndex(event.container.id);
    const currentGroup = this.getGroupFields(currentGroupIndex);

    if (event.previousContainer.id === this.toolBoxFieldId) {
      // It is a new field being dropped from the 'toolbox'
      const fieldType: FormFieldTypes = event.item.data;
      const groupField = this.constructorService.createFieldGroup(fieldType);
      currentGroup.insert(event.currentIndex, groupField);
    } else {
      if (event.previousContainer.id === event.container.id) {
        // The field is being re-ordered in the current form group
        this.constructorService.moveFormArrayGroup(
          currentGroup,
          event.previousIndex,
          event.currentIndex
        );
      } else {
        const previousGroupIndex = getFormGroupIndex(
          event.previousContainer.id
        );
        const previousGroup = this.getGroupFields(previousGroupIndex);

        this.constructorService.moveBetweenArrayGroup(
          currentGroup,
          previousGroup,
          event.currentIndex,
          event.previousIndex
        );
      }
    }
  }

  addSelectOption({
    groupIndex,
    fieldIndex
  }: {
    groupIndex: number;
    fieldIndex: number;
  }) {
    const selectFields = (this.getGroupFields(groupIndex).at(
      fieldIndex
    ) as FormGroup).get('selectOptions') as FormArray;
    selectFields.push(this.constructorService.createSelectOption());
  }

  deleteSelectOption({
    groupIndex,
    fieldIndex,
    optionIndex
  }: {
    groupIndex: number;
    fieldIndex: number;
    optionIndex: number;
  }) {
    const selectFields = (this.getGroupFields(groupIndex).at(
      fieldIndex
    ) as FormGroup).get('selectOptions') as FormArray;
    selectFields.removeAt(optionIndex);
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }
}

const getFormGroupIndex = compose(Number, getStringLastCharacter);

function getStringLastCharacter(string: string) {
  return string.substring(string.length - 1);
}
