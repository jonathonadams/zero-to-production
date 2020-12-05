import { extractToken } from './auth-token';

describe('middleware - auth token', () => {
  describe('extractToken', () => {
    const tries = [
      {
        test: 'Bearer 1234.1234.1234',
        expected: { match: true, value: '1234.1234.1234' },
      },
      {
        test: 'bearer 1234',
        expected: { match: false },
      },
      {
        test: 'Bearer no spaces allowed',
        expected: { match: false },
      },
      {
        test: 'Bearer1234',
        expected: { match: false },
      },
      {
        test: '1234',
        expected: { match: false },
      },
      {
        test: 'asdfa asdf',
        expected: { match: false },
      },
      {
        test: 'Bearer 123.asd.321',
        expected: { match: true, value: '123.asd.321' },
      },
    ];

    tries.forEach(({ test, expected: { match, value } }) => {
      if (match) {
        it(`'${test}' should return '${value}'`, () => {
          expect(extractToken(test)).toBe(value);
        });
      }
      if (!match) {
        it(`'${test}' should return 'undefined'`, () => {
          expect(extractToken(test)).toBe(undefined);
        });
      }
    });
  });
});
