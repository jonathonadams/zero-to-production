module.exports = {
  name: 'frontend-common-utils-notifications',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/web/utils/notifications',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
