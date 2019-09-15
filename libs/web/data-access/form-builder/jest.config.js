module.exports = {
  name: 'frontend-data-access-form-builder',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/web/data-access/form-builder',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
