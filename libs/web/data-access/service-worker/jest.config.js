module.exports = {
  name: 'frontend-data-access-service-worker',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/web/data-access/service-worker',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
