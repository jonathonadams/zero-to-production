import { readFileSync } from 'fs';
import {
  BuilderOutput,
  createBuilder,
  BuilderContext
} from '@angular-devkit/architect';
import * as childProcess from 'child_process';
import { JsonObject } from '@angular-devkit/core';
import * as glob from 'glob';
import * as cpFile from 'cp-file';

const { sync } = glob;

// import * as tsPath from 'tspath'

export default createBuilder(_commandBuilder);

async function _commandBuilder(
  options: JsonObject,
  context: BuilderContext
): Promise<BuilderOutput> {
  context.reportStatus(`Executing custom builder...`);

  const tsChild = childProcess.spawn(
    'tsc',
    ['--build', options.tsConfig as string],
    {
      stdio: 'pipe'
    }
  );

  tsChild.stdout.on('data', data => {
    console.log('on data');
    context.logger.info(data.toString());
  });
  tsChild.stderr.on('data', data => {
    console.log('on error');
    context.logger.error(data.toString());
  });

  await new Promise<BuilderOutput>(resolve => {
    context.reportStatus(`Done with TypeScript Compilation.`);
    tsChild.on('close', code => {
      resolve({ success: code === 0 });
    });
  });

  const srcFiles = sync(`${options.src}/**/*.graphql`);

  const destinationFiles = srcFiles.map(fileName => {
    return `${options.outputPath}${fileName.substr(
      (options.src as string).length,
      fileName.length
    )}`;
  });

  await Promise.all([
    srcFiles.map((value, i) => {
      return cpFile(value, destinationFiles[i]);
    })
  ]);

  return new Promise<BuilderOutput>(resolve => {
    context.reportStatus(`Done with .`);
    resolve({ success: true });
  });
}
