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
import { IFormBuilderStructure } from '../form-builder.interface';
import { FormBuilderConstructorService } from '../form-constructor.service';
import { map, filter, tap, first } from 'rxjs/operators';

@Component({
  selector: 'uqt-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormBuilderComponent {
  toolBoxGroupId = 'tb-form-group';
  toolBoxFieldId = 'tb-field-group';
  dropListIds: string[] = [];

  builderForm: FormGroup;
  selectedForm$: Observable<IFormBuilderStructure | undefined>;

  showFormConfig = false;

  fieldVisible: { groupIndex: null | number; fieldIndex: null | number } = {
    groupIndex: null,
    fieldIndex: null
  };

  private sub: Subscription;

  constructor(
    private facade: FormBuilderFacade,
    private constructorService: FormBuilderConstructorService,
    private cd: ChangeDetectorRef
  ) {
    this.selectedForm$ = this.facade.selectedForm$;
  }

  ngOnInit() {
    (this.selectedForm$ as Observable<IFormBuilderStructure>)
      .pipe(
        filter(fb => fb !== undefined),
        map(fb => this.constructorService.formBuilder(fb)),
        tap(form => (this.builderForm = form))
      )
      .subscribe(f => {
        this.cd.detectChanges();
      });
  }

  get formGroups() {
    return this.builderForm.get('formGroups') as FormArray;
  }

  getGroupFields(index: number) {
    return (this.formGroups.get(String(index)) as FormGroup).get(
      'fields'
    ) as FormArray;
  }

  toggleFormConfig() {
    this.showFormConfig = !this.showFormConfig;
  }

  showFormField(groupIndex: number, fieldIndex: number) {
    const selected = this.fieldVisible;
    if (
      groupIndex === selected.groupIndex &&
      fieldIndex === selected.fieldIndex
    ) {
      selected.fieldIndex = selected.groupIndex = null;
    } else {
      this.fieldVisible = {
        groupIndex,
        fieldIndex
      };
    }
  }

  deleteFormGroup(i: number): void {
    this.formGroups.removeAt(i);
  }

  removeGroupField(groupIndex: number, fieldIndex: number) {
    this.getGroupFields(groupIndex).removeAt(fieldIndex);
  }

  onSubmit({ valid, value }: FormGroup) {
    if (valid) {
      this.selectedForm$.pipe(first()).subscribe(form => {
        const newForm = { ...form, ...value };
        this.facade.updateForm(newForm);
      });
    }
  }

  formGroupDropped(event: CdkDragDrop<FormGroup[]>) {
    const formGroups = this.formGroups;
    if (event.previousContainer.id === event.container.id) {
      this.constructorService.moveFormArrayGroup(
        formGroups,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      const formGroup = this.constructorService.createFormGroup();
      formGroups.insert(event.currentIndex, formGroup);
    }

    this.dropListIds = this.createConnectedToId(formGroups.length);
  }

  createConnectedToId(groups: number) {
    const ids: string[] = [];
    for (let i = 0; i < groups; i++) {
      ids.push(`fields-${i}`);
    }
    return ids;
  }

  formFieldDropped(event: CdkDragDrop<FormGroup[]>) {
    const currentGroupIndex = getFormGroupIndex(event.container.id);
    const currentGroup = this.getGroupFields(currentGroupIndex);

    if (event.previousContainer.id === this.toolBoxFieldId) {
      // It is a new field being dropped from the 'toolbox'
      const groupField = this.constructorService.createFieldGroup();
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

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }
}

const getFormGroupIndex = compose(Number, getStringLastCharacter);

function getStringLastCharacter(string: string) {
  return string.substring(string.length - 1);
}
