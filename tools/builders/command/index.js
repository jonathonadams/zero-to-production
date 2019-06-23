'use strict';
exports.__esModule = true;
var architect_1 = require('@angular-devkit/architect');
var childProcess = require('child_process');
exports['default'] = architect_1.createBuilder(_commandBuilder);
function _commandBuilder(options, context) {
  context.reportStatus('Executing custom builder...');
  var child = childProcess.spawn(
    'tsc',
    ['-p', options.tsConfig, '--outDir', options.outputPath],
    {
      stdio: 'pipe'
    }
  );
  child.stdout.on('data', function(data) {
    console.log('on data');
    context.logger.info(data.toString());
  });
  child.stderr.on('data', function(data) {
    console.log('on error');
    context.logger.error(data.toString());
  });
  return new Promise(function(resolve) {
    context.reportStatus('Done.');
    child.on('close', function(code) {
      resolve({ success: code === 0 });
    });
  });
}
