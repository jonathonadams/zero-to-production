module.exports = {
  name: 'frontend-data-access-router',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/frontend/data-access/router',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
