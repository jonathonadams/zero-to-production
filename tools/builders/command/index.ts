import {
  BuilderOutput,
  createBuilder,
  BuilderContext
} from '@angular-devkit/architect';
import * as childProcess from 'child_process';
import { JsonObject } from '@angular-devkit/core';

export default createBuilder(_commandBuilder);

function _commandBuilder(
  options: JsonObject,
  context: BuilderContext
): Promise<BuilderOutput> {
  context.reportStatus(`Executing custom builder...`);

  const child = childProcess.spawn(
    'tsc',
    [
      '-p',
      options.tsConfig as string,
      '--outDir',
      options.outputPath as string
    ],
    {
      stdio: 'pipe'
    }
  );

  child.stdout.on('data', data => {
    console.log('on data');
    context.logger.info(data.toString());
  });
  child.stderr.on('data', data => {
    console.log('on error');
    context.logger.error(data.toString());
  });

  return new Promise<BuilderOutput>(resolve => {
    context.reportStatus(`Done.`);
    child.on('close', code => {
      resolve({ success: code === 0 });
    });
  });
}
