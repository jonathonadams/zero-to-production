'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tslib_1 = require('tslib');
const architect_1 = require('@angular-devkit/architect');
const child_process_1 = tslib_1.__importStar(require('child_process'));
const glob_1 = tslib_1.__importDefault(require('glob'));
const cp_file_1 = tslib_1.__importDefault(require('cp-file'));
const del_1 = tslib_1.__importDefault(require('del'));
exports.default = architect_1.createBuilder(_buildApiBuilder);
function _buildApiBuilder(options, context) {
  return tslib_1.__awaiter(this, void 0, void 0, function*() {
    const uniNpx = process.platform === 'win32' ? 'npx.cmd' : 'npx';
    context.reportStatus(`Executing custom builder...`);
    // Wipe the directory
    yield del_1.default([`${options.outputPath}/**`, `!${options.outputPath}`]);
    const tsChild = child_process_1.default.spawn(
      uniNpx,
      ['tsc', '--build', options.tsConfig],
      {
        stdio: 'pipe'
      }
    );
    tsChild.stdout.on('data', data => {
      context.logger.info(data.toString());
    });
    tsChild.stderr.on('data', data => {
      context.logger.error(data.toString());
    });
    yield new Promise(resolve => {
      context.reportStatus(`Done with TypeScript Compilation.`);
      tsChild.on('close', code => {
        resolve({ success: code === 0 });
      });
    });
    const srcFiles = yield new Promise((resolve, reject) => {
      glob_1.default(`${options.src}/**/*.graphql`, (err, matches) => {
        resolve(matches);
      });
    });
    const destinationFiles = srcFiles.map(fileName => {
      return `${options.outputPath}${fileName.substr(
        options.src.length,
        fileName.length
      )}`;
    });
    yield Promise.all([
      srcFiles.map((value, i) => {
        return cp_file_1.default(value, destinationFiles[i]);
      })
    ]);
    // TODO  -> Move this to own npm package
    yield new Promise((resolve, reject) => {
      child_process_1.exec(
        `node tools/scripts/alias-replace/replace-aliases.js --tsConfig ${options.tsConfig}`,
        (error, stdout, stderr) => {
          if (error) {
            reject(error);
          }
          if (stderr) {
            console.log(stderr);
          }
          resolve(stdout);
        }
      );
    });
    return new Promise(resolve => {
      context.reportStatus(`Done with .`);
      resolve({ success: true });
    });
  });
}
//# sourceMappingURL=index.js.map
