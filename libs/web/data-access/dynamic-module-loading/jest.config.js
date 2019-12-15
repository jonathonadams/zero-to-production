module.exports = {
  name: 'web-data-access-dynamic-module-loading',
  preset: '../../../../jest.config.js',
  coverageDirectory:
    '../../../../coverage/libs/web/data-access/dynamic-module-loading',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
