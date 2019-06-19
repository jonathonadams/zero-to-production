module.exports = {
  name: 'frontend-common-ui-layouts',
  preset: '../../../../../jest.config.js',
  coverageDirectory: '../../../../../coverage/libs/frontend/common/ui/layouts',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
