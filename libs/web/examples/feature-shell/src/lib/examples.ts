import { IExample } from '@uqt/examples/data-access';

// TODO -> link to the correct github repo

export const EXAMPLES: IExample[] = [
  // The Dynamic Form Component must be the first example to align with the lazy load modules
  // If this changes, ensure to correct the that component as well
  {
    id: '1',
    title: 'Dynamic Form Component',
    summary:
      'Create a dynamic form component to remove the pain from using angular form',
    description:
      'With the amount of boiler plate required to use forms in Angular, they ' +
      'can become tedious quickly. Creating and using a dynamic form component ' +
      'application wide can significantly simplify forms and help standardize styling, ' +
      'validation, animations etc.',
    url: 'dynamic-form',
    link: 'some-github-link'
  },
  {
    id: '2',
    title: 'Drag & Drop Form Builder',
    summary: 'A Drag & Drop form builder for user creatable forms',
    description:
      'Building on the Dynamic Form Component, an example of a Drag & Drop Form ' +
      'Builder to allow users to build their own forms.',
    url: 'form-builder',
    link: 'some-github-link'
  },
  {
    id: '3',
    title: 'Themeing with CSS Variables',
    summary: 'Using CSS Variables to create user configurable Theme',
    description:
      'Combing CSS Variables along with a Theming Service allows for create user configurable color pallet',
    url: 'theming',
    link: 'some-github-link'
  },
  {
    id: '4',
    title: 'Lazy Load Scrolling',
    summary:
      'A scrolling strategy to lazy load feature modules (thank you IVY __HEART__) ',
    description:
      'It is common practice to lazy load modules as child routes, but there are more ways to ' +
      'benefit from code splitting. Scrolling is just one example of how to manually load modules.',

    url: 'lazy-scroll',
    link: 'some-github-link'
  },
  {
    id: '5',
    title: 'Todo app with authentication',
    summary: 'A demonstration of using dynamic forms and user created forms',
    description:
      'A demonstration of using dynamic forms and user created forms',
    url: 'secure',
    link: 'some-github-link'
  }
];
