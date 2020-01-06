export const component = `// example.component.ts
const CONTACT_DETAILS: TFormGroups = [
  {
    formGroup: 'contactDetails',
    groupType: FormGroupTypes.Group,
    fields: [
      {
        componentType: FormFieldTypes.Input,
        type: 'text',
        name: 'contactNumber',
        label: 'Contact Number',
        validators: [Validators.required]
      },
      {
        componentType: FormFieldTypes.Input,
        type: 'email',
        name: 'emailAddress',
        label: 'Email Address',
        validators: [Validators.required, Validators.email]
      }
    ]
  }
];

...

ngOnInit() {
  this.formFacade.setStructure({ structure: CONTACT_DETAILS });
}`;

export const markup = `<!-- example.component.html -->
<app-dynamic-form>
  <button type="submit">Submit</button>
</app-dynamic-form>`;

export const submitSyntax = `// example.component.ts
constructor(private formFacade: DynamicFormFacade) {
  this.formFacade.submit$.subscribe(formOutput => {
      // do something with the output
  });
}`;
