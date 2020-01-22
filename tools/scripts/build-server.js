'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tslib_1 = require('tslib');
const child_process_1 = require('child_process');
const process_1 = require('process');
//@ts-ignore
const minimist_1 = tslib_1.__importDefault(require('minimist'));
const args = minimist_1.default(process_1.argv.slice(2), {
  string: ['projectDirectory', 'containerName']
});
if (!args.projectDirectory || !args.containerName) {
  console.error('Project directory and container name must be specified');
  console.log('');
  console.log('usage:');
  console.log(
    'npm run build:server --projectDirectory=path/to/server --containerName=test-container'
  );
  process_1.exit(1);
}
child_process_1.exec(
  `docker build -t ${args.containerName} -f docker/api.Dockerfile --build-arg PROJECT_DIRECTORY=${args.projectDirectory} .`,
  (error, stdout, sdterr) => {
    if (error) {
      console.error(error);
      process_1.exit(1);
    }
    if (sdterr) {
      console.log(error);
    }
    console.log(stdout);
  }
);
