module.exports = {
  name: 'frontend-utils-storage',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/web/utils/storage',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
