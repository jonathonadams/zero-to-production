'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tslib_1 = require('tslib');
const architect_1 = require('@angular-devkit/architect');
const childProcess = require('child_process');
const glob = require('glob');
const cpFile = require('cp-file');
const { sync } = glob;
// import * as tsPath from 'tspath'
exports.default = architect_1.createBuilder(_commandBuilder);
function _commandBuilder(options, context) {
  return tslib_1.__awaiter(this, void 0, void 0, function*() {
    context.reportStatus(`Executing custom builder...`);
    const tsChild = childProcess.spawn('tsc', ['--build', options.tsConfig], {
      stdio: 'pipe'
    });
    tsChild.stdout.on('data', data => {
      console.log('on data');
      context.logger.info(data.toString());
    });
    tsChild.stderr.on('data', data => {
      console.log('on error');
      context.logger.error(data.toString());
    });
    yield new Promise(resolve => {
      context.reportStatus(`Done with TypeScript Compilation.`);
      tsChild.on('close', code => {
        resolve({ success: code === 0 });
      });
    });
    const srcFiles = sync(`${options.src}/**/*.graphql`);
    const destinationFiles = srcFiles.map(fileName => {
      return `${options.outputPath}${fileName.substr(
        options.src.length,
        fileName.length
      )}`;
    });
    yield Promise.all([
      srcFiles.map((value, i) => {
        return cpFile(value, destinationFiles[i]);
      })
    ]);
    return new Promise(resolve => {
      context.reportStatus(`Done with .`);
      resolve({ success: true });
    });
  });
}
//# sourceMappingURL=index.js.map
