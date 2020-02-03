module.exports = {
  name: 'shared-utils-service-worker',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/shared/utils/service-worker',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
