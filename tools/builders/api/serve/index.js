import * as tslib_1 from 'tslib';
import { createBuilder } from '@angular-devkit/architect';
import childProcess from 'child_process';
import glob from 'glob';
import cpFile from 'cp-file';
export default createBuilder(_commandBuilder);
function _commandBuilder(options, context) {
  return tslib_1.__awaiter(this, void 0, void 0, function*() {
    context.reportStatus(`Executing custom builder...`);
    const tsChild = childProcess.spawn(
      'tsc',
      ['--build', options.tsConfig, '--watch'],
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
      glob(`${options.src}/**/*.graphql`, (err, matches) => {
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
