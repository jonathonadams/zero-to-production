module.exports = {
  name: 'shared-utils-theme',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/shared/utils/theme',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
