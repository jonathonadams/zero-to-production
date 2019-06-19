module.exports = {
  name: 'frontend-data-access-floating-menu',
  preset: '../../../../jest.config.js',
  coverageDirectory:
    '../../../../coverage/libs/frontend/data-access/floating-menu',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
