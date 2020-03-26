import { examplesReducer } from './examples.reducer';
import * as ExampleActions from './examples.actions';
import { IExample } from '../example.interface';

describe('ExampleReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {} as any;
      const result = examplesReducer(undefined, action);
      expect(result).toMatchSnapshot();
    });
  });

  describe('AddExamples', () => {
    it('should add the examples to the example state', () => {
      const examples: IExample[] = [
        {
          id: '1',
          title: 'some title',
          summary: 'some description',
          description: 'some full description',
          url: 'example-1',
        },
        {
          id: '2',
          title: 'another title',
          summary: 'some other description',
          description: 'some other full description',
          url: 'example-2',
        },
      ];

      const action = ExampleActions.addExamples({ examples });
      const result = examplesReducer(undefined, action);
      expect(result).toMatchSnapshot();
    });
  });
});
